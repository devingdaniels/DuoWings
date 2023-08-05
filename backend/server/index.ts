import express, { Express, Request, Response, NextFunction } from "express";
const app: Express = express();
const port: number = 8585;

// Add CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Allow requests from any origin (you can restrict this to your frontend's domain)
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow the necessary HTTP methods
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); // Allow the necessary headers
  next();
});

// Your routes and other middleware here
app.get("/api", (req: Request, res: Response) => {
  res.send("Hello World!!!!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
