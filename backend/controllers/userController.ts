import e, { NextFunction, Request, Response } from "express";
import { UserModel as User } from "../mongodb/models/user";
import mongoose from "mongoose";
import helpers from "../helpers";
import bcryptjs from "bcryptjs";
import signJWT from "../middleware/signJWT";
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
    console.log("Error", error);
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    console.log("Login body", req.body);

    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid request, missing email or password",
      });
    }
    console.log("Login body", req.body);

    const user = await User.findOne({ email }).exec();

    if (!user) {
      const message = `User with email ${email} does not exist`;
      console.log(message);
      return res.status(401).json({
        message: message,
      });
    }
    console.log("User", user);
    bcryptjs.compare(password, user.password, (error, result) => {
      if (error) {
        return res.status(401).json({
          message: error.message,
        });
      } else if (result) {
        signJWT(user, (_error, token) => {
          if (_error) {
            return res.status(500).json({
              message: _error.message,
              error: _error,
            });
          } else if (token) {
            return res.status(200).json({
              message: "Auth successful",
              token: token,
              user: user,
            });
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

export { registerUser, loginUser };
