import { Request, Response } from "express";

export const registerUser = (req: Request, res: Response) => {
  res.send("Register route");
};

export const loginUser = (req: Request, res: Response) => {
  res.send("Login route");
};
