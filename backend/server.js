// server.js
// Sets up express app using node.js to create api for us to reach from front end react app.
// Communicates with MongoDB database to fetch data needed for browser.

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const songRoutes = require('./routes/songRoutes');

// Middleware
app.use(express.json()); // If there is a request that has a body, it passes/attaches it to the request object.
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Set up song routes for song requests.
app.use('/api/songs', songRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to MongoDB. Listening on port 4000');
        });
    })
    .catch((error) => {
        console.log(error);
    });

