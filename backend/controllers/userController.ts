import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { UserModel as User } from "../mongodb/models/user";
// import signJWT from "../functions/signJTW";

const NAMESPACE = "User";

const registerUser = (req: Request, res: Response, next: NextFunction) => {
  let { fname, lname, phonenumber, email, password } = req.body;

  bcryptjs.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      return res.status(401).json({
        message: hashError.message,
        error: hashError,
      });
    }

    const _user = new User({
      _id: new mongoose.Types.ObjectId(),
      fname,
      lname,
      email,
      phonenumber,
      password: hash,
    });

    return _user
      .save()
      .then((user) => {
        return res.status(201).json({
          user,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: error.message,
          error,
        });
      });
  });
};

export { registerUser };
