import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  lname: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
    index: true,
    lowercase: true,
  },
  password: { type: String, required: true, min: 6, max: 26 },
  phonenumber: {
    type: String,
    required: true,
    max: 20,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  profilePicture: {
    type: String,
    default: "",
  },
});

export const UserModel = mongoose.model("User", UserSchema, "users");
