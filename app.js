const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
require('./db/conn')
dotenv.config({path:'./config.env'})

const port = process.env.PORT || 5000;
app.use(express.json())
app.use(cookieParser()) 
const router = require('./router/route')
app.use(router)


// HEROKU PUBLISH 
if(process.env.NODE_ENV == 'production'){
    app.use(express.static("fifth/build"))
}


app.listen(port, () =>{
    console.log("server is running at " + port);
})