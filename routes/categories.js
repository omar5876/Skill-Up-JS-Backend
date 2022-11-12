const { Router } = require("express");
const {
  post,
  get,
  deleteCategory,
  updateCategory,
  getById,
} = require("../controllers/categories");

const router = Router();

router.post("/", post);
router.get("/", get);
router.get("/:id", getById);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);

module.exports = router;
