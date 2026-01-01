# YashBNB

A full-stack AirBnb clone built with Node.js, Express, MongoDB, and EJS templating.

## Features

- ✅ **Full CRUD Operations**
  - Create new listings
  - View all listings
  - View individual listing details
  - Edit existing listings
  - Delete listings

- 🎨 **Dynamic Views**
  - EJS templating for server-side rendering
  - Responsive design
  - Indian Rupee (₹) currency formatting

- 💾 **Database**
  - MongoDB with Mongoose ODM
  - 30+ sample listings included
  - Image storage with URL references

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Templating**: EJS
- **Middleware**: method-override for PUT/DELETE requests

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Yash13606/YashBNB.git
cd YashBNB
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on your system

4. Initialize the database with sample data:
```bash
node init/index.js
```

5. Start the server:
```bash
nodemon app.js
```

6. Visit `http://localhost:8080` in your browser

## Project Structure

```
AirBnb/
├── Models/
│   └── listing.js          # Mongoose schema for listings
├── views/
│   └── listings/
│       ├── index.ejs       # All listings page
│       ├── show.ejs        # Individual listing details
│       ├── new.ejs         # Create new listing form
│       └── edit.ejs        # Edit listing form
├── init/
│   ├── data.js             # Sample listing data
│   └── index.js            # Database initialization script
├── app.js                  # Main application file
└── package.json
```

## Routes

- `GET /` - Home page
- `GET /listings` - View all listings
- `GET /listings/new` - Form to create new listing
- `POST /listings` - Create new listing
- `GET /listings/:id` - View single listing
- `GET /listings/:id/edit` - Form to edit listing
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

## Dependencies

- express
- mongoose
- ejs
- method-override

## Author

Yash Marlekar

## License

MIT
