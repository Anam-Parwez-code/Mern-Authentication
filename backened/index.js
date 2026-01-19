//const bodyParser = require('body-parser');
//require('dotenv').config();
//const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/mydatabase')
//mongoose.connect(process.env.MONGO_CONN)
  //  .then(()=> console.log("MongoDB Connected"))
    //.catch((err)=>console.log(err));

//const express=require('express');
//const bodyParser=require('body-parser');

//const Auth= require('./routes/auth');
//const productRouter= require('./routes/productRouter');
//const app=express();
//const cors=require('cors');
//app.use(cors());
//require('dotenv').config();
//require('./Models/db');
//const PORT =process.env.PORT || 8080;
//app.get('/ping',(req,resp)=>{
  //  resp.send("PONG");
//});
//app.use(bodyParser.json());
//app.use(cors());
//app.use('/auth',Auth);
//app.use('/products',productRouter);
//app.listen(PORT,()=>{
  //  console.log(`server is running on ${PORT}`)
 // app.listen(5000, () => console.log("Server running on 5000"));

//})
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');

const Auth = require('./routes/auth');
const productRouter = require('./routes/productRouter');

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB once globally
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check
app.get('/ping', (req, res) => {
  res.send("PONG");
});

// Routes
app.use('/auth', Auth);
app.use('/products', productRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

