const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `MongoDB Connected : ${connect.connection.host}, ${connect.connection.name}`,
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = connectDB;
