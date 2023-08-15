import express from "express";
import http from "http";
import connectMongDB from "./mongodb/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import logging from "./config/logging";
import dotenv from "dotenv";
import userAuthRoutes from "./routes/user";
dotenv.config();

const NAMESPACE = "Index.ts";

const app = express();
const server = http.createServer(app);

connectMongDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/users/auth", userAuthRoutes);

/** Error handling */
app.use((req, res, next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

const PORT = process.env.SERVER_PORT || 8000;
server.listen(PORT, () => {
  logging.info(NAMESPACE, `Express server in ${NAMESPACE} running on http://localhost:${PORT}/...`);
});
