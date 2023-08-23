import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error handler has been triggered");

  // Determine the status code for the response
  const statusCode = res.statusCode || 500;

  // Log the error object for debugging
  console.error(err);

  // Create a custom error object with additional information
  const customError = {
    message: err.message || "Internal Server Error",
    // location: err.location || null,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  };
  console.log(customError);
  // Send the error response to the client
  res.status(statusCode).json(customError);
};

export default errorHandler;
