import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { faker } from "@faker-js/faker";
dotenv.config();
// Databse
import { connectDB } from "./config/db";
connectDB();
// Models
import { User } from "./models/User";
// Routes
import userRoutes from "./routes/userRoutes";
import { error } from "console";

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

// Routing middleware
app.use("/api/auth", userRoutes);

app.get("/create-user", async (req, res) => {
  try {
    const fakeUser = await createFakeUser();
    console.log(fakeUser);
    const user = await User.create(fakeUser);
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const createFakeUser = async () => {
  const fakeUser = {
    fname: faker.person.firstName(),
    lname: faker.person.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    hashedPassword: faker.internet.password(),
    role: "admin",
  };
  return fakeUser;
};

async function startServer() {
  try {
    // Connect to the database
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
