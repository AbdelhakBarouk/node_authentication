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
const cookieParser = require("cookie-parser");

//routers
const UserRouter = require("./routes/userRoute");
const AuthRouter = require("./routes/authRoute");

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//routes
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/auth", AuthRouter);
app.get("/", (req, res) => {
  console.log(req.signedCookies);
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
