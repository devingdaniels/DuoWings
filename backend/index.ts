import express from "express";
import http from "http";
import connectMongDB from "./mongodb/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";
import logging from "./config/logging";
import dotenv from "dotenv";
dotenv.config();

const NAMESPACE = "Index.ts";

const app = express();
const server = http.createServer(app);

connectMongDB();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", router());

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  logging.info(NAMESPACE, `Express server in ${NAMESPACE} running on http://localhost:${PORT}/...`);
});
