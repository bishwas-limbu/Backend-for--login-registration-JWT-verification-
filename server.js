import express from 'express';//framework initialization
import 'dotenv/config'; 

import indexRouter from './routes/index.js'; // importing from routes folder 

import {dbConnection} from './config/db.config.js';
//import dotenv from 'dotenv';
//dotenv.config();// do configure to read .env file variable

dbConnection();// mongo db connection

const app = express(); // assign all the functionality to app

// templating engine -- pug, ejs, handlebar
app.set('view engine', 'ejs');//setting ejs view engine for server side rendering (html)


//middleware parse json and rul encoded form data
app.use(express.json()); // middle ware that parse and read json format
app.use(express.urlencoded({extended: true}));// for x-www-form-urlencoded format data  reading


// use for routes
app.use('/api/v1',indexRouter);// appending /api/v1 in routes
//app.use(indexRouter);

// GET is for READ
// POST is for CREATE


const PORT = process.env.PORT || 8001; // accessing PORT variable for .env file.
// || 8001 there if PORT variable is ont available 8001 is used.

//listening server on prot 8001
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}...`);
});
