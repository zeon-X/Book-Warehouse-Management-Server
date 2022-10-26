const mongoose = require("mongoose");
const authFirebaseSchema = new mongoose.Schema(
  {
    userId: { type: String },
    email: { type: String },
    status: { type: String, enum: ["user", "admin"], default: "admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FirebaseAuthentication", authFirebaseSchema);
