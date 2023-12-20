import mongoose from "mongoose";
import logging from "../config/logging";
import config from "../config/config";

const NAMESPACE = "MongoDB Config";

const connectMongDB = async () => {
  try {
    await mongoose.connect(config.mongo.url, config.mongo.options);
    logging.info(NAMESPACE, "Database is Connected!");
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
  }
};

export default connectMongDB;
