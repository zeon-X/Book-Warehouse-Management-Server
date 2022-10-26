const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getCategoryById,
} = require("../controller/CategoryController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyTokens");

const router = require("express").Router();

router.post("/create", verifyTokenAndAdmin, createCategory);
router.put("/update", verifyTokenAndAdmin, updateCategory);
router.delete("/delete", verifyTokenAndAdmin, deleteCategory);
router.get("/get", verifyTokenAndAdmin, getCategory);
router.get("/find", verifyTokenAndAdmin, getCategoryById);

module.exports = router;
