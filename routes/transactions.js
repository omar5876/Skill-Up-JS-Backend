const express = require("express");
const {
  get,
  getById,
  balanceByUser,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions");

const router = express.Router();

router.get("/", get);
router.get("/:id", getById);
router.get("/balance/:id", balanceByUser);
router.post("/", createTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
