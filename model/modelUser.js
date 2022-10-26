const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    name: { type: String },
    email: { type: String },
    password: { type: String },
    status: { type: String, enum: ["user", "admin"], default: "admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
