//const mongoose =require('mongoose');
//const mongo_url =process.env.MONGO_CONN;
//mongoose.connect(mongo_url)
  //.then(()=>{
    //console.log("MongoDB Connected");
  //})
  //.catch((err)=>{
   // console.log('MongDB connection Error:',err);
  //})
// db.js
const mongoose = require('mongoose');

let isConnected; // track the connection state

const connectDB = async () => {
  if (isConnected) {
    console.log("=> Using existing MongoDB connection");
    return;
  }

  try {
    const mongo_url = process.env.MONGO_CONN;
    if (!mongo_url) {
      throw new Error("MongoDB connection string is missing in environment variables");
    }

    const db = await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log("=> MongoDB Connected");
  } catch (err) {
    console.error("=> MongoDB connection Error:", err.message);
    process.exit(1); // exit process if connection fails
  }
};

module.exports = connectDB;
