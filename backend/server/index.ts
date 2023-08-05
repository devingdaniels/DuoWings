import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const app: Express = express();
const port: number = parseInt(process.env.PORT || "3000", 10); // Use the PORT variable from .env or default to 3000

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
app.get("/api", (req: Request, res: Response) => {
  res.send("Hello World!!!!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
