const Expense = require("../models/Expense.model");

// ======================
// ADD EXPENSE
// ======================
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const expense = await Expense.create({
      title,
      amount,
      category,
      date,
      user: req.user,
    });

    res.status(201).json(expense);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// GET EXPENSES
// ======================
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user }).sort({
      createdAt: -1,
    });
    res.json(expenses);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// UPDATE EXPENSE
// ======================
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// DELETE EXPENSE
// ======================
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await expense.deleteOne();
    res.json({ message: "Expense deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};
