const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
  {
    categoryTitle: { type: String },
    subCategory: [{ type: String }],
    updatedBy: { type: String },
    categoryCode: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", CategorySchema);
