import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

// Add CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Your routes and other middleware here
import userRoutes from "./routes/userRoutes";
app.use("/api/users", userRoutes);

async function startServer() {
  try {
    await connectDB(); // Wait for database connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
