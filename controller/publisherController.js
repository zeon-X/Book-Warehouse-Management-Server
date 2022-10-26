const Publisher = require("../model/modelPublisher");
// CREATE A Publisher
const createPublisher = async (req, res) => {
  const newPublisher = new Publisher(req.body);
  try {
    const savedPublisher = await newPublisher.save();
    res.status(201).json(savedPublisher);
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

// UPDATE A Publisher
const updatePublisher = async (req, res) => {
  if (!req.query._id) res.status(400).json({ msg: "_id not provided" });
  try {
    const updatedPublisher = await Publisher.findByIdAndUpdate(
      req.query._id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPublisher);
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

// DELETE
const deletePublisher = async (req, res) => {
  if (!req.query._id) res.status(400).json({ msg: "_id not provided" });
  try {
    await Publisher.findByIdAndDelete(req.query._id);
    res.status(200).json("Publisher has been deleted");
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

// GET BY ID
const getPublisherById = async (req, res) => {
  if (!req.query._id) res.status(400).json({ msg: "_id not provided" });
  try {
    const fetchedData = await Publisher.findById(req.query._id);
    res.status(200).json(fetchedData);
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

// GE BY FILTER
const getPublisher = async (req, res) => {
  // pagination
  const qpage = parseInt(req.query.page) || 0;
  const qlimit = parseInt(req.query.limit) || 30;
  try {
    let fetchedData;
    fetchedData = await Publisher.find({})
      .sort({ createdAt: -1 })
      .skip(qpage * qlimit)
      .limit(qlimit);
    // console.log(fetchedData);
    res.status(200).json(fetchedData);
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

module.exports = {
  createPublisher,
  updatePublisher,
  deletePublisher,
  getPublisher,
  getPublisherById,
};
