import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import helpers from "../helpers";
import jwt from "jsonwebtoken";
import signJWT from "../middleware/signJWT";
import { UserModel as User } from "../mongodb/models/user";
import asyncHandler from "express-async-handler";

const NAMESPACE = "User";

const registerUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { fname, lname, phonenumber, email, password, confirmPassword } = req.body;

  // First check if the user already exists
  const existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    res.status(400).json({ errorType: "emailConflict", message: `User with email ${email} already exists` });
    return;
  }

  // Check if the password and confirm password fields match
  if (password !== confirmPassword) {
    res.status(400).json({ message: "Passwords do not match" });
    return;
  }

  // Hash the user's password
  const hashedPassword = await helpers.hashPassword(password);

  // Create a new instance of the User model
  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    fname,
    lname,
    email,
    phonenumber,
    password: hashedPassword,
  });

  // Save the user to the database
  const savedUser = await newUser.save();

  // Generate a JWT token
  const token = await signJWT(savedUser);

  res.cookie("user_token", token, { httpOnly: true, maxAge: 3600000 });

  res.status(201).json({
    user: savedUser,
    token: token,
  });
});

const logoutUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  // Verify the token from the cookie
  const token = req.cookies.user_token;
  if (!token) {
    console.log(`Token is ${token}`);
    res.status(401).json({ message: "Unauthorized" });
  }

  try {
    console.log(`Token is ${token}`);
    const decoded = jwt.verify(token, ".Sj@vRAHvctzeUxnDJ*RkAT_?IOK}P");
    res.clearCookie("user_token");
    res.json({ message: "Protected route", user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
});

export { registerUser, logoutUser };
