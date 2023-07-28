// const { Express, Request, Response } = require("express")
// const swaggerJSDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// const option = {
//     definition: {
//         openapi: '3.0.3',
//         info: {
//             title: '24-karat',
//             version: '1.0.0',
//         },
//         components: {
//             securitySchemas: {
//                 bearerAuth: {
//                     type: "http",
//                     schema: "bearer",
//                     bearerFormat: "JWT"
//                 }
//             }
//         },
//         security:[
//             {
//                 bearerAuth: [],
//             }
//         ],
//         servers: [
//             {
//                 url: 'http://localhost:5000/'
//             }
//         ]
//     },
//     apis: ['../routes/allRoutes.js']
// }
 
// const swaggerSpec = swaggerJSDoc(option);

// function swaggerDocs(app:Express, port: number )

// module.exports = swaggerSpec