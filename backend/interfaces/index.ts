import { Document } from "mongoose";

export interface IUser extends Document {
  fname: string;
  lname: string;
  email: string;
  phonenumber: string;
}

/* ERRORS*/
export interface CustomError extends Error {
  code?: string;
}
