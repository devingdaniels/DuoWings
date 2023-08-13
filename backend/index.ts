import express from "express";
import http from "http";
import connectMongDB from "./mongodb/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import logging from "./config/logging";
import dotenv from "dotenv";
import userRoutes from "./routes/user";
dotenv.config();

const NAMESPACE = "Index.ts";

const app = express();
const server = http.createServer(app);

connectMongDB();

app.use("/auth/users", userRoutes);

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/auth/users", userRoutes);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  logging.info(NAMESPACE, `Express server in ${NAMESPACE} running on http://localhost:${PORT}/...`);
});
