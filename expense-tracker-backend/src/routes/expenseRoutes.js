import express from "express";
import { addExpense, deleteExpense, expenseDetails, getMonthlyExpenses, lastSevenDaysExpenses } from "../controllers/expenseController.js";

const router = express.Router();

router.post("/", addExpense);
router.get("/monthly", getMonthlyExpenses);
router.get("/get-expenses",expenseDetails);
router.post("/delete", deleteExpense);
router.get("/last-seven-days",lastSevenDaysExpenses);

export default router;
