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
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  dialogues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dialogue" }],
  vocabulary: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vocabulary" }],
  profilePicture: {
    type: String,
    default: "",
  },
});

export const UserModel = mongoose.model("User", UserSchema, "Users");

// User Actions
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) =>
  UserModel.findOne({ email }).select("+authentication.salt +authentication.password +authentication.sessionToken");
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
