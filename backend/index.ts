import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";
import ConnectDB from "./config/mongoDB";
import logging from "./config/logging";

const NAMESPACE = "Server";

// Connect to MongoDB
ConnectDB();

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
  logging.info(NAMESPACE, `Server is running on http://localhost:${PORT}/...`);
});

app.use("/", router());
