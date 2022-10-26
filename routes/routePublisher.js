const {
  createPublisher,
  updatePublisher,
  deletePublisher,
  getPublisher,
  getPublisherById,
} = require("../controller/publisherController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyTokens");

const router = require("express").Router();

router.post("/create", verifyTokenAndAdmin, createPublisher);
router.put("/update", verifyTokenAndAdmin, updatePublisher);
router.delete("/delete", verifyTokenAndAdmin, deletePublisher);
router.get("/get", verifyTokenAndAdmin, getPublisher);
router.get("/find", verifyTokenAndAdmin, getPublisherById);

module.exports = router;
