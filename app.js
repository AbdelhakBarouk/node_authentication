require("dotenv").config();
require("express-async-errors");
//express
const express = require("express");
const app = express();

//db
const connectDB = require("./db/connectDB");

//middleware

//rest of packages

//routes
app.get("/", (req, res) => {
  res.send("home route");
});
//middelwares

//app
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {}
};

start();
