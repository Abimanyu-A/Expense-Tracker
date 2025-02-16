import axios from "axios"
import { useEffect, useState } from "react"

function DisplayExpense() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);   
    const [error, setError] = useState(null);

    const CATEGORY_COLORS = {
        food: "#FFD4B2",       
        transport: "#B3D9FF",  
        entertainment: "#B8F2E6", 
        other: "#FFE599",      
    };
    

    useEffect(() => {
        axios.get("http://localhost:5000/api/expenses/get-expenses")
            .then(response => {
                if(response.data.length === 0){
                    setError("No expenses recorded yet");
                    setLoading(false);
                    return;
                }
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError("Failed to fetch expenses");
                setLoading(false);
            });
        },[]
    );

    if(loading) return <p className="text-gray-600">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    return (
        
        <div >
            <h2 className="text-2xl font-bold mb-4">Today's Expenses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {data.map((expense) => (
                    <div 
                        key={expense._id} 
                        className="p-4 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20"
                        style={{ backgroundColor: CATEGORY_COLORS[expense.category] || "#ffffff30" }}                      
                    >
                        <p className="text-xl font-semibold text-gray-800">{expense.expense}</p>
                        <p className="text-lg font-medium text-green-500">₹{expense.amount}</p>
                        <p className="text-sm text-gray-900 uppercase">{expense.category}</p>
                    </div>
                ))}
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>

    )
}

export default DisplayExpense
