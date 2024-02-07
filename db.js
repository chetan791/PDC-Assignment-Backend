const mongoose = require("mongoose");
require("dotenv").config();

// connecting to db
const conncection = mongoose.connect(process.env.MONGO_URL);

module.exports = conncection;
