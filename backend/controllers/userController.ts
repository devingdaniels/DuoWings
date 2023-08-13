import { NextFunction, Request, Response } from "express";
import { UserModel as User } from "../mongodb/models/user";
import mongoose from "mongoose";
import helpers from "../helpers";

const NAMESPACE = "User";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  let { fname, lname, phonenumber, email, password } = req.body;

  try {
    const hashedPassword = await helpers.hashPassword(password);

    const _user = new User({
      _id: new mongoose.Types.ObjectId(),
      fname,
      lname,
      email,
      phonenumber,
      password: hashedPassword,
    });

    const savedUser = await _user.save();

    return res.status(201).json({
      user: savedUser,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export { registerUser };
