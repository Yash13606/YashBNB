const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./Models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");    
app.use(methodOverride("_method"));
main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://localhost:27017/airbnb");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("This is the home page");
})

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

//New Route (must be before :id route)
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

//Create Route
app.post("/listings", async (req, res) => {
    try {
        let { title, description, price, location, country } = req.body;
        let listing = new Listing({
            title,
            description,
            price,
            location,
            country,
            image: {
                filename: "listingimage",
                url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
            }
        });
        await listing.save();
        res.redirect("/listings");
    } catch (err) {
        console.error(err);
        res.status(400).send(`Error creating listing: ${err.message}`);
    }
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}); 

//Update Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let { title, description, price, location, country } = req.body;
    await Listing.findByIdAndUpdate(id, { title, description, price, location, country });
    res.redirect("/listings");
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

/* 
app.get("/listings", (req, res) => {
    let samplelisintg = new Listing({
        title: "Sample Listing",
        description: "This is a sample listing",
        price: 100,
        location: "Sample Location",
        createdAt: new Date()
    });
    samplelisintg.save();
    res.send("This is the listings page");
}); */

/* app.get("/testListing", async (req, res) => {
    let sampleListing = new Listing({
        title: "My New Villa",
        description: "By the beach",
        image: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        },
        price: 1200,
        location: "Calangute, Goa",
        country: "India"
    });
    await sampleListing.save();
    console.log("Sample listing was saved");
    res.send("Sample listing created successfully!");
}); */

app.get("/allListings", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.json(allListings);
    } catch (err) {
        res.status(500).send("Error fetching listings: " + err.message);
    }
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});