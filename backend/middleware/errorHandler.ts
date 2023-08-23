import { Request, Response, NextFunction } from "express";
import { CustomError } from "../interfaces/index";

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error("Error handler has been triggered");

  const statusCode = res.statusCode || 500;

  console.error(err);

  const customError = {
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    errorCode: err.code || "UNEXPECTED_ERROR",
  };

  console.error(customError);
  res.status(statusCode).json(customError);
};

export default errorHandler;
