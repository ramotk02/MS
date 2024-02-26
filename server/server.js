const express = require("express");
const app = express();
const port = 3002;
const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(`mongodb+srv://omartakyot:${process.env.MONGODB_PASSWORD}@cluster0.mxrkn5l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });