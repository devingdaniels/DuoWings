import { Request, Response, NextFunction } from "express";
import { comparePassword, hashPassword } from "../helpers";
import { UserModel as User } from "../mongodb/models/userModel";
import { signJWT } from "../middleware/authMiddleware";
import mongoose from "mongoose";
import config from "../config/config";

const USER_COOKIE_NAME = config.server.userauthcookie;

// Login route handler
const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  // Deconstruct the request body
  const { fname, lname, phonenumber, email, password, confirmPassword } = req.body;

  try {
    if (!fname || !lname || !phonenumber || !email || !password || !confirmPassword) {
      res.status(400);
      throw new Error("All fields are required");
    }

    // Check if the password and confirm password fields match
    if (password !== confirmPassword) {
      res.status(400);
      throw new Error("Passwords do not match");
    }
    // First check if the user already exists
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      res.status(400);
      throw new Error(`User with email ${email} already exists`);
    }

    // Hash the user's password
    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      res.status(500);
      throw new Error("Unknown error. Please try again");
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
    const token = await signJWT(newUser._id.toString());

    // set cookie for 24 hours (maxAge is in milliseconds)
    const maxAge = 24 * 60 * 60 * 1000;
    res.cookie(USER_COOKIE_NAME, token, { httpOnly: true, maxAge: maxAge });

    res.status(201).json(newUser);
  } catch (error) {
    // Call the error handler middleware with the error
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  // Deconstruct the request body
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400);
      throw new Error("Missing email or password");
    }

    const existingUser = await User.findOne({ email }).exec();
    if (!existingUser) {
      res.status(404);
      throw new Error(`${email} does not exist`);
    }

    if (!(await comparePassword(password, existingUser.password))) {
      res.status(422);
      throw new Error("Invalid password");
    }

    // Generate a JWT token
    const token = await signJWT(existingUser._id.toString());

    // Set the cookie in the response using the JWT token
    res.cookie(USER_COOKIE_NAME, token, { httpOnly: true, maxAge: 3600000 });

    res.status(201).json(existingUser);
  } catch (error) {
    // Pass error to error handler middleware
    next(error);
  }
};

const logoutUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // This is a protected route, so the cookie token has already been verified
  try {
    // Access the cookie from the req.cookies object
    const cookieValue = req.cookies[USER_COOKIE_NAME];

    if (!cookieValue) {
      throw new Error("Cookie not found");
    }

    // Clear the cookie
    res.clearCookie(USER_COOKIE_NAME, { httpOnly: true });
    res.status(200).json({ message: "Cookie removed: logout successful" });
  } catch (error: any) {
    next(error);
  }
};

export { registerUser, logoutUser, loginUser };
