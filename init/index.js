const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../Models/listing.js");

main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://localhost:27017/airbnb");
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data inserted successfully");
};

initDB();
