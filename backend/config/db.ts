import mongoose, {
  Connection,
  Mongoose,
  Schema,
  Document,
  Model,
} from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const dbUri = process.env.MONGODB_CONNECT_STRING || "";

    mongoose.connect(dbUri);

    const connection: Connection = mongoose.connection;

    connection.on("error", (error) => {
      console.error("Connection to the server failed:", error);
      throw error;
    });

    connection.once("open", async () => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

export { connectDB };
