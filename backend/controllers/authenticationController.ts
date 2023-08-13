import express from "express";
import { getUserByEmail, createUser } from "../db/users";
import { authentication, random } from "../helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { fname, lname, email, phonenumber, password } = req.body;
    console.log(fname, lname, email, phonenumber, password);

    if (!fname || !lname || !email || !phonenumber || !password) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      fname,
      lname,
      email,
      phonenumber,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
