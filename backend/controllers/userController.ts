import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import helpers from "../helpers";
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

  res.status(201).json({
    user: savedUser,
    token: token,
  });
});
export { registerUser };
