const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "manager", "user"] },
  },
  { timestamps: true },
);

const User = mongoose.model("users", userSchema);

module.exports = User;
