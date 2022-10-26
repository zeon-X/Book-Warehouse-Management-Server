const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema(
  {
    title: { type: String },
    publisher: { type: String },
    author: { type: String },
    translated_by: { type: String },
    category: { type: String },
    description: { type: String },
    base_price: { type: Number, default: 0 },
    sell_price: { type: Number, default: 0 },
    offer_percentage: { type: Number, default: 0 },
    stoke_quantity: { type: Number },
    book_cover: { type: String },
    book_cover_thumb: { type: String },
    updatedBy: { type: String },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Book", bookSchema);
