const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const swaggerUi = require('swagger-ui-express')
const YAML = require("yamljs");
const swaggerJsDoc = YAML.load("./swagger.yaml");


// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//routes
const route = require('./routes/allRoutes');

// Use the router middleware
app.use('/v1', route);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc))

// connect mongodb
const connectToMongoDB = require("./config/connectMongdb");
connectToMongoDB();

PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
});