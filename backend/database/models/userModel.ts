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
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
    index: true, // Indexes are used to quickly locate data without having to search every row in a database every time a database table is accessed.
  },
  password: { type: String, required: true, min: 6, max: 26 },
  phonenumber: {
    type: String,
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

// Params: modelName, schema, collectionName
export const UserModel = mongoose.model("User", UserSchema, "users");
