import { Document } from "mongoose";

export default interface IUser extends Document {
  fname: string;
  lname: string;
  email: string;
  phonenumber: string;
}
