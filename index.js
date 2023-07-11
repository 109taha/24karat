const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

//routes
const route = require('./routes/allRoutes');

// Use the router middleware
app.use('/v1', route);


// connect mongodb
const connectToMongoDB = require("./config/connectMongdb");
connectToMongoDB();

PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
});