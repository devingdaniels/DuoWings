// Third-party library imports
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";

// Local file imports
import connectMongDB from "./database/configDB";
import logging from "./config/logging";
import errorHandler from "./middleware/errorHandler";

// Routes
import deckRoutes from "./routes/deckRoutes";
import userAuthRoutes from "./routes/userRoutes";
import wordRoutes from "./routes/wordRoutes";

const NAMESPACE = "backend/index.ts";
const PORT = process.env.SERVER_PORT || 8000;

const config = dotenv.config();
const app = express();
const server = http.createServer(app);

connectMongDB();

app.use(
  cors({
    origin: "http://localhost:45678",
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use(compression()); // compress all responses which helps to reduce the size of the response body and increase the speed of a web application
app.use(cookieParser()); // parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(bodyParser.json()); // parse incoming request bodies in a middleware before your handlers, available under the req.body property

app.use("/api/users/auth", userAuthRoutes);
app.use("/api/decks", deckRoutes);
app.use("/api/words", wordRoutes);

app.use(errorHandler);

server.listen(PORT, () => {
  logging.info(NAMESPACE, `Express server in ${NAMESPACE} running on http://localhost:${PORT}/...`);
});
