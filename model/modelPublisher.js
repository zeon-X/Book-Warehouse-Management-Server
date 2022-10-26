const mongoose = require("mongoose");
const publisherSchema = new mongoose.Schema(
  {
    name: { type: String },
    mobile: { type: String },
    website: { type: String },
    email: { type: String },
    address: { type: String },
    logo: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Publisher", publisherSchema);
