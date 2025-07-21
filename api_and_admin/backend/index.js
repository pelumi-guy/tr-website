// const https = require('https')
import app from './app.js';
import { connectDatabase } from './mongodb/connect.js';
import dotenv from 'dotenv';
// import cloudinary from 'cloudinary';
// import os from 'os';
// import fs from 'fs';

dotenv.config({ path: "config.env" })

const port = process.env.PORT || 3001;

//Handling uncaught exceptions
process.on('uncaughtException', async err => {
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting down the server due to unhandled exception");
    process.exit(1)
})



// HTTPS configurations
// const _homedir = os.homedir();
// const key = fs.readFileSync(_homedir+'/ssl-cert/localhost-key.pem','utf-8')
// const cert = fs.readFileSync(_homedir+'/ssl-cert/localhost.pem','utf-8')

// const parameters = {
//     key,
//     cert
//   }

// Connect to Database
connectDatabase();

// Cloudinary configuration
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

const server = app.listen(port, () => {
    console.log(`Server started on PORT: ${port} in ${process.env.NODE_ENV} mode.`)
})

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

//Handling unhandled Promise Rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting down the server due to unhandled Promise rejection");
    server.close(() => {
        process.exit(1)
    });
})