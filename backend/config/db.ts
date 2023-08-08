import mongoose, { Connection, Mongoose, ConnectOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async (): Promise<Mongoose> => {
  try {
    const dbUri = process.env.MONGODB_CONNECT_STRING || "";
    const connection = await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log("Successfully connected to MongoDB!");

    return mongoose;
  } catch (error) {
    console.error("Connection to the server failed:", error);
    throw error;
  }
};

export { connectDB };
