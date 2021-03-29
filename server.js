const bodyParser = require("body-parser");
const config = require("./Config");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");

// Router Imports
const items = require("./Routes/Api/items");
const polls = require("./Routes/Api/polls");

// Environment Variables
const { MONGO_DB_NAME, MONGO_URI, PORT, NODE_ENV } = config;

const app = express();
// Info-security Middleware
app.use(helmet());
// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS Middleware
app.use(cors());

// Logger Middleware
app.use(morgan("dev"));

// Mongoose Server Connection
const options = {
  dbName: MONGO_DB_NAME,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose
  .connect(MONGO_URI, options)
  .then(() => console.log("MongoDB connected...."))
  .catch((err) => console.log(err));

//Register routes
app.use("/api/item/", items);
app.use("/api/polls/", polls);
// Start express server
app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`)
);
