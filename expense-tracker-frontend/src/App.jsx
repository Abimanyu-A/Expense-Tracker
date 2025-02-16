import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpenseChart from "./components/ExpenseChart";
import Layout from "./Layout";
import AddExpense from "./components/AddExpense";
import DisplayExpense from "./components/DisplayExpense";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ExpenseChart />} />
          <Route path="add-expense" element={<AddExpense />} />
          <Route path="view-expense" element={<DisplayExpense />} />
        </Route>
      </Routes>
    </Router>
  );
}
