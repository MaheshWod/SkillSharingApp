// const mongoose = require('mongoose')

// // const DB = process.env.MONGO_URI;

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//      // Timeout in 30 seconds
  
  
// }).then(()=>console.log("Database is connectionn")).catch((error)=>console.log("Not connection",error));

// const mongoose = require("mongoose");

// const DB = process.env.DATABASE;

// mongoose.connect(DB,{
//     useUnifiedTopology:true,
//     useNewUrlParser:true
// }).then(()=>console.log("database connected")).catch((err)=>console.log("errr",err))


import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to database: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error connecting to database: ${err.message}`);
        process.exit(1); // Exit the process if DB connection fails
    }
};

export default connectDB;
