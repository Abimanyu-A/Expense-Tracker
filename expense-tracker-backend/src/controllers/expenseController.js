import { Expense } from "../models/Expense.js";

export const addExpense = async (req, res) => {
  try {
    const { expense, amount, date, category } = req.body;
    const newExpense = new Expense({
      expense: expense,
      amount,
      category,
      date: date, // Add the current date
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: "Error adding expense" });
  }
};

export const getMonthlyExpenses = async (req, res) => {
  let { month, year } = req.query;

  if (!month || !year) {
    return res.status(400).json({ error: "Month and year are required" });
  }

  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);

  if (isNaN(monthNum) || isNaN(yearNum)) {
    return res.status(400).json({ error: "Invalid month or year" });
  }

  const startDate = new Date(yearNum, monthNum - 1, 1);
  const endDate = new Date(yearNum, monthNum, 1);

  try {
    const expenses = await Expense.aggregate([
      { $match: { date: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Error fetching expenses" });
  }
};

export const expenseDetails = async (req,res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23,59,59,999);

    const expenses = await Expense.find({
      date: {$gte: start, $lte: end}
    }).select("expense amount category");

    res.status(200).json(expenses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching expenses" });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(deletedExpense);
  } catch (error) {
    res.status(500).json({ error: "Error deleting expense" });
  }
};

export const lastSevenDaysExpenses = async (req, res) => {
  try {
      const start = new Date();
      start.setDate(start.getDate() - 6); 
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      const expenses = await Expense.find({
          date: { $gte: start, $lte: end }
      });

      res.status(200).json(expenses);
  } catch (error) {
      res.status(500).json({ error: "Error fetching expenses" });
  }
};
