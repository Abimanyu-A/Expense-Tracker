import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function MonthlyExpense() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/expenses/monthly?month=2&year=2025")
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError("Failed to fetch expenses");
                setLoading(false);
            });
    }, []);

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    if (loading) return <p className="text-gray-600">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (data.length === 0) return <p className="text-gray-500">No expenses recorded for this month.</p>;

    return (
        <div>
            <PieChart width={350} height={350}>
                <Pie
                    data={data}
                    dataKey="total"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={entry._id} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    )
}

export default MonthlyExpense
