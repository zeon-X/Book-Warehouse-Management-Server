const Category = require("../model/modelCategory");

// CREATE A Category
const createCategory = async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

// UPDATE A Category
const updateCategory = async (req, res) => {
  if (!req.query._id) res.status(400).json({ msg: "_id not provided" });
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.query._id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

// DELETE
const deleteCategory = async (req, res) => {
  if (!req.query._id) res.status(400).json({ msg: "_id not provided" });
  try {
    await Category.findByIdAndDelete(req.query._id);
    res.status(200).json("Category has been deleted");
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

// GET BY ID
const getCategoryById = async (req, res) => {
  if (!req.query._id) res.status(400).json({ msg: "_id not provided" });
  try {
    const fetchedData = await Category.findById(req.query._id);
    res.status(200).json(fetchedData);
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

// GE BY FILTER
const getCategory = async (req, res) => {
  try {
    let fetchedData;
    fetchedData = await Category.find({});
    // console.log(fetchedData);
    res.status(200).json(fetchedData);
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getCategoryById,
};
