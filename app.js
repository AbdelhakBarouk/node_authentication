require("dotenv").config();
require("express-async-errors");
//express
const express = require("express");
const app = express();

//db
const connectDB = require("./db/connectDB");

//middleware
const notFoundMiddelware = require("./middelwares/notFound");
const errorHandlerMiddleware = require("./middelwares/error-handller");

//rest of packages

//routers
const UserRouter = require("./routes/userRoute");

app.use(express.json());

//routes
app.use("/api/v1/users", UserRouter);
app.get("/", (req, res) => {
  res.send("home route");
});
//middelwares
app.use(notFoundMiddelware);
app.use(errorHandlerMiddleware);
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
