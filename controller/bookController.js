const Book = require("../model/modelBook");

// CREATE A BOOK
const createBook = async (req, res) => {
  const newBook = new Book(req.body);
  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

// UPDATE A BOOK
const updateBook = async (req, res) => {
  if (!req.query._id) res.status(400).json({ msg: "_id not provided" });
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.query._id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

//UPDATE QUANTITY
const updateBookQuantity = async (req, res) => {
  // console.log(req.query);
  if (!req.query._id) res.status(400).json({ msg: "_id not provided" });
  if (!req.query.stoke_quantity)
    res.status(400).json({ msg: "provide a valid quantity" });

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.query._id,
      {
        $set: {
          stoke_quantity: parseInt(req.query.stoke_quantity),
        },
      },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
    // console.log(err);
  }
};

// DELETE
const deleteBook = async (req, res) => {
  if (!req.query._id) res.status(400).json({ msg: "_id not provided" });
  try {
    await Book.findByIdAndDelete(req.query._id);
    res.status(200).json("Book has been deleted");
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

// GET BY ID
const getBookById = async (req, res) => {
  let _id = req.query._id;

  if (!_id) res.status(400).json({ msg: "_id not provided" });
  try {
    const fetchedData = await Book.findById(_id).exec();

    // ||||||||||||||||||||| IF ADMIN THEN SEND ALL INFORMATIONS
    // if (req.user.status === "admin") {
    res.status(200).json(fetchedData);
    // }
    // ELSE SEND USER INFORMATIONS
    // else {
    //   const { base_price, updatedBy, ...rest } = fetchedData._doc;
    //   res.status(200).json(rest);
    // }
    // |||||||||||||||||||||||
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

// GE BY FILTER
const getBook = async (req, res) => {
  // search data
  const qtitle = req.query.title;
  // filter
  const qpub = req.query.pub;
  const qcategory = req.query.category;
  const qstatus = req.query.status || "Active";
  // pagination
  const qpage = parseInt(req.query.page) || 0;
  const qlimit = parseInt(req.query.limit) || 30;

  // console.log(qpub);

  try {
    let fetchedData;

    // TITLE || CATEGORY || PUBLISHER
    if (qtitle && qcategory && qpub) {
      fetchedData = await Book.find({
        title: {
          $regex: qtitle,
          $options: "i",
        },
        category: qcategory,
        publisher: qpub,
      })
        .sort({ createdAt: -1 })
        .skip(qpage * qlimit)
        .limit(qlimit);
    }
    // CATEGORY || PUB
    else if (qcategory && qpub) {
      fetchedData = await Book.find({
        category: qcategory,
        publisher: qpub,
      })
        .sort({ createdAt: -1 })
        .skip(qpage * qlimit)
        .limit(qlimit);
    }
    // TITLE || CATEGORY
    else if (qtitle && qcategory) {
      fetchedData = await Book.find({
        title: {
          $regex: qtitle,
          $options: "i",
        },
        category: qcategory,
      })
        .sort({ createdAt: -1 })
        .skip(qpage * qlimit)
        .limit(qlimit);
    }
    // TITLE || PUBLISHER
    else if (qtitle && qpub) {
      fetchedData = await Book.find({
        title: {
          $regex: qtitle,
          $options: "i",
        },
        publisher: qpub,
      })
        .sort({ createdAt: -1 })
        .skip(qpage * qlimit)
        .limit(qlimit);
    }
    // TITLE
    else if (qtitle) {
      fetchedData = await Book.find({
        title: {
          $regex: qtitle,
          $options: "i",
        },
      })
        .sort({ createdAt: -1 })
        .skip(qpage * qlimit)
        .limit(qlimit);
    }
    // PUBLISHER
    else if (qpub) {
      fetchedData = await Book.find({ publisher: qpub })
        .sort({ createdAt: -1 })
        .skip(qpage * qlimit)
        .limit(qlimit);
    }
    // CATEGORY
    else if (qcategory) {
      fetchedData = await Book.find({ category: qcategory })
        .sort({ createdAt: -1 })
        .skip(qpage * qlimit)
        .limit(qlimit);
    }
    //ALL BOOK
    else {
      fetchedData = await Book.find({})
        .sort({ createdAt: -1 })
        .skip(qpage * qlimit)
        .limit(qlimit);
    }

    // fetchedData = await Book.find({
    //   title: {
    //     $regex: qtitle,
    //     $options: "i",
    //   },
    //   category: qcategory,
    //   publisher: qpub,
    //   status: qstatus,
    // })
    // .sort({ createdAt: -1 })
    // .skip(qpage * qlimit)
    // .limit(qlimit);

    // console.log(fetchedData);
    res.status(200).json(fetchedData);

    // ||||||||||||||||||||| IF ADMIN THEN SEND ALL INFORMATIONS
    //   if (req.user.status === "admin") {
    //     res.status(200).json(fetchedData);
    //   }
    //   // ELSE SEND USER INFORMATIONS
    //   else {
    //     const { base_price, updatedBy, ...rest } = fetchedData._doc;
    //     res.status(200).json(rest);
    //   }

    //   // |||||||||||||||||||||||
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

const getMyBooks = async (req, res) => {
  //id
  const updatedBy = req.query._id;
  // search data
  const qtitle = req.query.title;
  // filter
  const qpub = req.query.pub;
  const qcategory = req.query.category;
  const qstatus = req.query.status || "Active";
  // pagination
  const qpage = parseInt(req.query.page) || 0;
  const qlimit = parseInt(req.query.limit) || 30;

  // console.log(qpub);

  try {
    let fetchedData;

    // TITLE || CATEGORY || PUBLISHER
    if (qtitle && qcategory && qpub) {
      fetchedData = await Book.find({
        title: {
          $regex: qtitle,
          $options: "i",
        },
        category: qcategory,
        publisher: qpub,
        updatedBy: updatedBy,
      })
        .sort({ createdAt: -1 })
        .skip(qpage * qlimit)
        .limit(qlimit);
    }
    // CATEGORY || PUB
    else if (qcategory && qpub) {
      fetchedData = await Book.find({
        category: qcategory,
        publisher: qpub,
        updatedBy: updatedBy,
      })
        .sort({ createdAt: -1 })
        .skip(qpage * qlimit)
        .limit(qlimit);
    }
    // TITLE || CATEGORY
    else if (qtitle && qcategory) {
      fetchedData = await Book.find({
        title: {
          $regex: qtitle,
          $options: "i",
        },
        category: qcategory,
        updatedBy: updatedBy,
      })
        .sort({ createdAt: -1 })
        .skip(qpage * qlimit)
        .limit(qlimit);
    }
    // TITLE || PUBLISHER
    else if (qtitle && qpub) {
      fetchedData = await Book.find({
        title: {
          $regex: qtitle,
          $options: "i",
        },
        publisher: qpub,
        updatedBy: updatedBy,
      })
        .sort({ createdAt: -1 })
        .skip(qpage * qlimit)
        .limit(qlimit);
    }
    // TITLE
    else if (qtitle) {
      fetchedData = await Book.find({
        title: {
          $regex: qtitle,
          $options: "i",
        },
        updatedBy: updatedBy,
      })
        .sort({ createdAt: -1 })
        .skip(qpage * qlimit)
        .limit(qlimit);
    }
    // PUBLISHER
    else if (qpub) {
      fetchedData = await Book.find({ publisher: qpub, updatedBy: updatedBy })
        .sort({ createdAt: -1 })
        .skip(qpage * qlimit)
        .limit(qlimit);
    }
    // CATEGORY
    else if (qcategory) {
      fetchedData = await Book.find({
        category: qcategory,
        updatedBy: updatedBy,
      })
        .sort({ createdAt: -1 })
        .skip(qpage * qlimit)
        .limit(qlimit);
    }
    //ALL BOOK
    else {
      fetchedData = await Book.find({ updatedBy: updatedBy })
        .sort({ createdAt: -1 })
        .skip(qpage * qlimit)
        .limit(qlimit);
    }
    res.status(200).json(fetchedData);
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

module.exports = {
  createBook,
  updateBook,
  deleteBook,
  getBook,
  getMyBooks,
  getBookById,
  updateBookQuantity,
};
