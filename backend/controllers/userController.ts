import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import helpers from "../helpers";
import { UserModel as User } from "../mongodb/models/user";
import asyncHandler from "express-async-handler";
import { signJWT, verifyJWT } from "../middleware/authMiddleware";
import config from "../config/config";

const NAMESPACE = "User";
const USER_COOKIE_NAME = config.server.userauthcookie;

// Login route handler
const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  // Deconstruct the request body
  const { fname, lname, phonenumber, email, password, confirmPassword } = req.body;

  try {
    if (!fname || !lname || !phonenumber || !email || !password || !confirmPassword) {
      throw new Error("All fields are required");
    }

    // Check if the password and confirm password fields match
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    // First check if the user already exists
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      throw new Error(`User with email ${email} already exists`);
    }

    // Hash the user's password
    const hashedPassword = await helpers.hashPassword(password);
    if (!hashedPassword) {
      throw new Error("Error hashing password");
    }

    // Create a new instance of the User model
    const newUser = await new User({
      _id: new mongoose.Types.ObjectId(),
      fname,
      lname,
      email,
      phonenumber,
      password: hashedPassword,
    }).save();

    // Generate a JWT token
    const token = await signJWT(newUser);

    res.cookie(USER_COOKIE_NAME, token, { httpOnly: true, maxAge: 3600000 });

    res.status(201).json({
      user: newUser,
      token: token,
    });
  } catch (error) {
    // Call the error handler middleware with the error
    next(error);
  }
};

const logoutUser = async (req: Request, res: Response): Promise<void> => {
  // This is a protected route, so the cookie token has already been verified
  try {
    // Access the cookie from the req.cookies object
    const cookieValue = req.cookies[USER_COOKIE_NAME];
    console.log(cookieValue);

    if (!cookieValue) {
      throw new Error("Cookie not found");
    }

    // Clear the cookie
    res.clearCookie(USER_COOKIE_NAME, { httpOnly: true });
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default logoutUser;

export { registerUser, logoutUser };
