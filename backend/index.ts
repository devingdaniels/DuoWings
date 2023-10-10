import express from "express";
import http from "http";
import connectMongDB from "./mongodb/configDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import logging from "./config/logging";
import dotenv from "dotenv";
// Routes
import deckRoutes from "./routes/deckRoutes";
import userAuthRoutes from "./routes/userRoutes";
import wordRoutes from "./routes/wordRoutes";
import errorHandler from "./middleware/errorHandler";
dotenv.config();

const NAMESPACE = "index.ts";
const PORT = process.env.SERVER_PORT || 8000;

const app = express();
const server = http.createServer(app);

connectMongDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "OPTIONS", "DELETE", "HEAD"],
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/users/auth", userAuthRoutes);
app.use("/api/decks", deckRoutes);
app.use("/api/words", wordRoutes);

app.use(errorHandler);

server.listen(PORT, () => {
  logging.info(NAMESPACE, `Express server in ${NAMESPACE} running on http://localhost:${PORT}/...`);
});
