const cors = require('cors')
const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//cors 
app.use(cors({
    origin: '*'
}))

// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//routes
const route = require('./routes/allRoutes');

// Use the router middleware
app.use('/v1', route);
app.get("/", (req, res) => {
    res.send("hello world from page 1");
});


// connect mongodb
const connectToMongoDB = require("./config/connectMongdb");
connectToMongoDB();

PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
});