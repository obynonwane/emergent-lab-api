const dotenv = require("dotenv");
//load env vars
dotenv.config({ path: "./config/config.env" });


require("events").EventEmitter.defaultMaxListeners = 25;
const path = require("path");

//Third party paackages
const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const multer = require("multer");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");

//bring in route files
const employee = require("./routes/employee");

//Import Model
const Employee = require("./models/Employee");

//import midddleware
const { errorHandler } = require("./middleware/error");


const sequelize = require("./utils/mysqlConnect"); //connect to mysql

//initialise app variables with express
const app = express();
app.use(cors());

//This middleware logs the request method and url to console
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//sanitize
app.use(mongoSanitize());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Body Parser - to process json body
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cookie parser
app.use(cookieParser());

//sanitize
app.use(mongoSanitize());
//set security heaaders in helmet
app.use(helmet());
//Cross site scripting prevention
app.use(xss());

//mount routers - route middleware
app.use("/api/v1/employee", employee);

//custom error handler
app.use(errorHandler);

//create our model tables - from sequelize
sequelize
  .sync()
  .then((result) => {
    // console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

//getting port from env vars.
const PORT = process.env.PORT || 4000;

//runnig a server.
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);


// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process with failure (1)
  server.close(() => process.exit(1));
});

module.exports = server;
