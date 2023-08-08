import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
// Databse
import { connectDB } from "./config/db";
// Routes
import userRoutes from "./routes/userRoutes";

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specified HTTP methods
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"], // Allow specified request headers
  })
);

// Your routes and other middleware here

app.use("/api/users", userRoutes);

async function startServer() {
  try {
    // Connect to the database
    await connectDB();
    // Log that we successfully connected to the database
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
