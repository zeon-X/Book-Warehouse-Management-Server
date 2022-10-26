const User = require("../model/modelUser");
const jwt = require("jsonwebtoken");

//User registration
const registerUser = async (req, res) => {
  //   console.log(req.body);
  const pass = req.body.password; //encrypt password & put it on pass

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    password: pass,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

//User login || JWT TOEKN
const loginUser = async (req, res) => {
  //   console.log(req.body);
  const password = req.body.password;
  const pass = req.body.password;
  //encrypt password to pass here
  const username = req.body.username;
  try {
    let userInfo = await User.findOne({ username: username });
    //db will return all userdata if there any

    if (userInfo && userInfo?.password === pass) {
      //we are ok to proceed || GENERATE jwt
      const { password, ...rest } = userInfo._doc;
      let userData = rest;

      const accessToken = jwt.sign(userData, process.env.JWT_KEY, {
        expiresIn: "30d",
      });

      res.status(200).json({ authorization: accessToken, user_data: userData });
    } else {
      res.status(500).json({ msg: "wrong password" });
    }
  } catch (err) {
    res.status(500).json({ error: err, msg: "user information not found" });
  }
};

// update
const updateUser = async (req, res) => {
  const pass = req.body.new_password; //encrypt password & put it on pass
  const _id = req.query._id;

  if (!_id) res.status(400).json({ msg: "_id not provided" });

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: _id },
      { password: pass }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({ user_data: rest });
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

//delete
const deleteUser = async (req, res) => {
  const _id = req.query._id;
  if (!_id) res.status(400).json({ msg: "_id not provided" });
  try {
    await User.findByIdAndDelete(_id);
    res.status(200).json({ msg: "user deleted.." });
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

//get
const getUser = async (req, res) => {
  const qemail = req.query.email || "";
  const _id = req.query._id;

  const qpage = parseInt(req.query.page) || 0;
  const qlimit = parseInt(req.query.limit) || 30;
  // const qnew = req.query.new === "true";
  try {
    let fetchedData;

    if (_id) {
      fetchedData = await User.findById(_id);
    } else if (qemail) {
      fetchedData = await User.find({ email: qemail });
    } else {
      fetchedData = await User.find({})
        .sort({ createdAt: -1 })
        .skip(qpage * qlimit)
        .limit(qlimit);
    }

    // console.log(fetchedData);
    res.status(200).json(fetchedData);
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Error" });
  }
};

module.exports = { registerUser, loginUser, updateUser, deleteUser, getUser };
