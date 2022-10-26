const jwt = require("jsonwebtoken");

//MIDDLE WIRE TO VERIFY TOKEN VALIDITY
const verifyToken = (req, res, next) => {
  let authHeader = req.headers.authorization;
  // console.log(req.headers);
  if (authHeader) {
    let token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) res.status(403).json({ msg: "Token invalid", error: err });
      else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json("authentication header not found :\\");
  }
};

//MIDDLE WIRE INSIDE MIDDLEWIRE || Authorization
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.status === "admin") next();
    else res.status(403).json("Opps...! you don't have access");
  });
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id === req.query._id || req.user.status === "admin") {
      // console.log("executed");
      next();
    } else res.status(403).json("Opps...! you don't have access");
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
};
