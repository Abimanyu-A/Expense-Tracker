import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./db/db.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// API Routes (consider versioning if needed, e.g., "/api/v1/expenses")
app.use("/api/expenses", expenseRoutes);

// 404 Handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
