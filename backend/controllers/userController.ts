import { Request, Response, NextFunction } from "express";
import { comparePassword, hashPassword } from "../helpers";
import { UserModel as User } from "../database/models/userModel";
import { signJWT } from "../middleware/auth";
import mongoose from "mongoose";
import config from "../config/config";

const USER_COOKIE_NAME = config.server.userauthcookie;

// Login route handler
const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  // Deconstruct the request body
  let { fname, lname, phonenumber, username, email, password, confirmPassword } = req.body;

  try {
    if (!fname || !lname || !username || !email || !password || !confirmPassword) {
      res.status(400);
      throw new Error("All fields are required");
    }

    // Check if the password and confirm password fields match
    if (password !== confirmPassword) {
      res.status(400);
      throw new Error("Passwords do not match");
    }

    // Check if the user with the given username already exists
    const existingUserByUsername = await User.findOne({ username }).exec();
    if (existingUserByUsername) {
      res.status(400);
      throw new Error(`${username} is taken`);
    }
    // Check if the user with the given email already exists
    const existingUserByEmail = await User.findOne({ email }).exec();
    if (existingUserByEmail) {
      res.status(400);
      throw new Error(`${email} already exists`);
    }

    // Hash the user's password
    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      res.status(500);
      throw new Error("Unknown error. Please try again");
    }

    // Create and save new user to DB
    const newUser = await new User({
      _id: new mongoose.Types.ObjectId(),
      fname,
      lname,
      username,
      email,
      phonenumber,
      password: hashedPassword,
    }).save();

    // Generate a JWT token
    const token = await signJWT(newUser._id.toString());

    //! This is not working properly. Need some kind frontend middleware --> maxAge: config.server.token.expireTime
    res.cookie(USER_COOKIE_NAME, token, { httpOnly: true });

    res.status(201).json(newUser);
  } catch (error) {
    // Call the error handler middleware with the error
    res.status(500);
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  // Deconstruct the request body
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    res.status(400);
    throw new Error("Missing email/username or password");
  }

  // User can login with email or username, determine which
  // This works because usernames are required to not contain '@'
  const isEmail = identifier.includes("@");
  const query = isEmail ? { email: identifier } : { username: identifier };

  console.log(query);

  try {
    const existingUser = await User.findOne(query).exec();
    if (!existingUser) {
      res.status(404);
      throw new Error("User not found");
    }

    if (!(await comparePassword(password, existingUser.password))) {
      res.status(422);
      throw new Error("Invalid password");
    }

    // Generate a JWT token
    const token = await signJWT(existingUser._id.toString());

    // Set the cookie in the response using the JWT token
    //! This is not working properly. Need some kind frontend middleware --> maxAge: config.server.token.expireTime
    res.cookie(USER_COOKIE_NAME, token, { httpOnly: true });

    res.status(201).json(existingUser);
  } catch (error) {
    // Pass error to error handler middleware
    res.status(500);
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
    res.status(200).json({ message: "Auth revoked and logout successful" });
  } catch (error: any) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log("deleteUser");
  res.status(200).json({ message: "deleteUser" });
};

export { registerUser, logoutUser, loginUser, deleteUser };
