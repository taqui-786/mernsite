const mongoose = require('mongoose');
const dotenv = require('dotenv')


dotenv.config({path:'./config.env'})



const db = process.env.DATABASE;
mongoose.connect(db).then(()=>{console.log('DATABASE connected...')}).catch((err)=>{
    console.log("no connection" + err)
})