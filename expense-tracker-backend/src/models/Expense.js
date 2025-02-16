import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        expense:
        {
            type: String,
            required: true,
        },
        amount: 
        { 
            type: Number, 
            required: true 
        },
        category: 
        { 
            type: String, 
            required: true 
        },
        date: 
        { 
            type: Date, 
            default: Date.now 
        },
        
    },
    {
        timestamps: true
    }
);

export const Expense = mongoose.model("Expense", expenseSchema);
