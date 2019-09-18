const mongoose = require("mongoose");
const config = require("./index");

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", err => {
  console.log("Mongo DB connection failed: " + err.message);
  process.exit(200);
});

db.once("open", () => {
  console.log("Successfully connected to Mongo DB");
});
