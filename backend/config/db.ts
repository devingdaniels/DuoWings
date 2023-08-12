import mongoose, {
  Connection,
  Mongoose,
  Schema,
  Document,
  Model,
} from "mongoose";
import dotenv from "dotenv";
dotenv.config();

interface ITest extends Document {
  name: string;
}

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

      const MyModel: Model<ITest> = mongoose.model<ITest>(
        "Test",
        new Schema({ name: String })
      );

      try {
        const result = await MyModel.findOne();
        console.log("findOne result:", result);
      } catch (error) {
        console.error("Error executing findOne:", error);
      }
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

export { connectDB };
