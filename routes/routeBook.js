const {
  createBook,
  updateBook,
  deleteBook,
  getBook,
  getBookById,
  updateBookQuantity,
  getMyBooks,
} = require("../controller/bookController");
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewares/verifyTokens");

const router = require("express").Router();

router.post("/create", verifyTokenAndAdmin, createBook);
router.put("/update", verifyTokenAndAdmin, updateBook);
router.put("/update_quantity", verifyTokenAndAdmin, updateBookQuantity);
router.delete("/delete", verifyTokenAndAdmin, deleteBook);
router.get("/get", getBook);
router.get("/getmine", getMyBooks);
router.get("/find", getBookById);

module.exports = router;
