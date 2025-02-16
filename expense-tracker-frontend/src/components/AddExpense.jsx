import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Wallet } from "lucide-react";

function AddExpense() {
  const [expense, setExpense] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [error, setError] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/expenses",
        {
          expense: expense,
          amount: parseFloat(amount),
          date: date? new Date(date) : new Date(),
          category: category,
        },
      )
      console.log("Expense added:", response.data);
      alert("Expense added successfully!");
    } catch (error) {
      console.error("Error adding expense:", error);
      setError("Failed to add expense");
    }
  }

  return (
    <form className='flex'>
      <div className="grid grid-cols-2 gap-4 p-4 bg-white shadow-lg rounded-lg">
        <input 
          type="text" 
          placeholder="Enter Expense" 
          className="p-2 border rounded" 
          value={expense} 
          onChange={(e) => setExpense(e.target.value)} 
          />

        <input 
          type="date" 
          className="p-2 border rounded" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
          />

        <input 
          type="number" 
          placeholder="Enter Amount" 
          className="p-2 border rounded" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
        />

        <select className="p-2 border rounded" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
        </select>

        <button className="col-span-2 mt-3 flex items-center justify-center gap-1 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          onClick={handleAdd}>
          <Wallet size={15} />
          Add Expense
        </button>
      </div>
    </form>

  )
}

export default AddExpense
