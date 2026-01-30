const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} = require("../controllers/expense.controller");

// Protect all routes
router.use(authMiddleware);

// Add expense
router.post("/", addExpense);

// Get expenses (with filters)
router.get("/", getExpenses);

// Update expense
router.put("/:id", updateExpense);

// Delete expense
router.delete("/:id", deleteExpense);

module.exports = router;
