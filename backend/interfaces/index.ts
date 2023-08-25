import exp from "constants";
import { Document } from "mongoose";

export interface IUser extends Document {
  fname: string;
  lname: string;
  email: string;
  phonenumber: string;
}
