import { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const WeeklyExpense = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/expenses/last-seven-days")
            .then(response => {
                const expenses = response.data;
                
                const groupedData = Array(7).fill(0).map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (6 - i));

                    const dateString = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

                    const totalAmount = expenses
                        .filter(expense => new Date(expense.date).toDateString() === date.toDateString())
                        .reduce((sum, expense) => sum + expense.amount, 0);

                    return { date: dateString, amount: totalAmount };
                });

                setData(groupedData);
            })
            .catch(error => console.error("Error fetching expenses:", error));
    }, []);

    return (
        <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="date" stroke="black"  />
                    <YAxis stroke="black" label={{ value: "Amount Spent (₹)", angle: -90, position: "outsideLeft", dy: -10, dx: -20, fill: "gray" }} />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#00C49F" radius={[10, 10, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeeklyExpense;
