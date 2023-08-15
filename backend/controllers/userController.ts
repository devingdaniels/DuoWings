import mongoose from "mongoose";
import helpers from "../helpers";
import bcryptjs from "bcryptjs";
import signJWT from "../middleware/signJWT";
import { NextFunction, Request, Response } from "express";
import { UserModel as User } from "../mongodb/models/user";

const NAMESPACE = "User";
const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fname, lname, phonenumber, email, password } = req.body;

    const hashedPassword = await helpers.hashPassword(password);

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      fname,
      lname,
      email,
      phonenumber,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Generate a JWT token
    const token = await signJWT(savedUser);

    // Set the JWT as an HTTP-only cookie
    res.cookie("token", token, { httpOnly: true });

    return res.status(201).json({
      user: savedUser,
      token: token,
    });
  } catch (error: any) {
    console.error("Error", error);
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export default registerUser;

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid request, missing email or password",
      });
    }

    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(401).json({
        message: `User with email ${email} does not exist`,
      });
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Generate a JWT token
    const token = await signJWT(user);

    // Set the JWT as an HTTP-only cookie
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      message: "Auth successful",
      token: token,
      user: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err,
    });
  }
};

const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Clear the 'token' cookie to log the user out
    res.clearCookie("token", {
      httpOnly: true,
      // Other cookie options (e.g., secure: true for HTTPS)
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error: any) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { registerUser, loginUser, logoutUser };
