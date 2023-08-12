import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import router from "./router";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const PORT = process.env.PORT || 8585;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/...`);
});

const MONGO_URL = process.env.MONGODB_CONNECT_STRING || "connection string";

// Initialize MongoDB
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
// Error handler
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
