import MonthlyExpense from "./MonthlyExpense";
import WeeklyExpense from "./WeeklyExpense";

export default function ExpenseChart() {
    return (
        <div>
            <div className="p-6 m-2 bg-white/10 backdrop-blur-lg rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-700">Monthly Expense Chart</h2>
                <div>
                    <MonthlyExpense />
                </div>
            </div>
            <div className="p-6 m-2 bg-white/10 backdrop-blur-lg rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-700">Past 7 Days Expenses</h2>
                <div className="border-gray-500">
                    <WeeklyExpense />
                </div>
            </div>
        </div>

    );
}
