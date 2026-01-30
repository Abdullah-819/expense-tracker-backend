const Expense = require("../models/Expense.model");

// ======================
// ADD EXPENSE
// ======================
const addExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    if (!title || !amount) {
      return res.status(400).json({ message: "Title and amount are required" });
    }

    const expense = await Expense.create({
      title,
      amount,
      category,
      user: req.user,
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// GET EXPENSES (FILTERS)
// ======================
const getExpenses = async (req, res) => {
  try {
    const {
      type = "day", // day | month | year
      year,
      month,
      category,
      min,
      max,
    } = req.query;

    const query = { user: req.user };

    // CATEGORY FILTER
    if (category) {
      query.category = category;
    }

    // AMOUNT FILTER
    if (min || max) {
      query.amount = {};
      if (min) query.amount.$gte = Number(min);
      if (max) query.amount.$lte = Number(max);
    }

    // DATE FILTER
    const now = new Date();

    if (type === "day") {
      const start = new Date(now.setHours(0, 0, 0, 0));
      const end = new Date(now.setHours(23, 59, 59, 999));
      query.createdAt = { $gte: start, $lte: end };
    }

    if (type === "month" && year && month) {
      query.createdAt = {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1),
      };
    }

    if (type === "year" && year) {
      query.createdAt = {
        $gte: new Date(year, 0, 1),
        $lt: new Date(Number(year) + 1, 0, 1),
      };
    }

    const expenses = await Expense.find(query).sort({ createdAt: -1 });

    res.json(expenses);
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};
