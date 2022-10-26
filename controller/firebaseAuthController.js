const FirebaseAuth = require("../model/modelAuthForFirebase");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res) => {
  let userInfo;
  //FINDING IF ANY USER EXIST WITH THIS DATA
  try {
    userInfo = await FirebaseAuth.findOne({ email: req.body.email });
  } catch (err) {
    res.status(500).json({ error: err, msg: "opps..! Findone Error" });
  }

  //IF NOT EXIST CREATE ONE AND SAVE IT TO userInfo
  if (userInfo) {
    if (userInfo.userId !== req.body.userId)
      res.status(500).json({ error: err, msg: "opps..! Don't try it again" });
    // console.log("found");
  } else {
    try {
      userInfo = await new FirebaseAuth({
        email: req.body.email,
        userId: req.body.userId,
      }).save();
    } catch (err) {
      res.status(500).json({ error: err, msg: "opps..! create Error" });
    }
  }

  //   console.log(typeof userInfo);

  const { userId, ...rest } = userInfo._doc;
  let userData = rest;

  //AFTER SAVING THE USER NOW GENARATE jwt token WITH THE USER INFO
  const accessToken = jwt.sign(userData, process.env.JWT_KEY, {
    expiresIn: "30d",
  });

  //PASS THE TOKEN AS RESPONSE
  res.status(200).json({ authorization: accessToken, user_data: userInfo });
};

module.exports = { authenticateUser };
