const { authenticateUser } = require("../controller/firebaseAuthController");

const router = require("express").Router();
router.post("/authentication", authenticateUser);

module.exports = router;
