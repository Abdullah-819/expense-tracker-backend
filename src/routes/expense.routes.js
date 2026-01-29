const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} = require("../controllers/expense.controller");

// 🔒 Protect all expense routes
router.use(authMiddleware);

// ➕ Add expense
router.post("/", addExpense);

// 📄 Get all expenses
router.get("/", getExpenses);

// ✏️ Update expense
router.put("/:id", updateExpense);

// ❌ Delete expense
router.delete("/:id", deleteExpense);

module.exports = router;
