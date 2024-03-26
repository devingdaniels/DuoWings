import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";

const NAMESPACE = "errorHandler.ts";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  const customError = {
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  };

  console.log(NAMESPACE, customError.message, customError.stack);
  res.status(statusCode).json(customError);
};

export default errorHandler;
