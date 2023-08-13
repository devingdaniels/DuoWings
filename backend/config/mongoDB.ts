import dotenv from "dotenv";
import mongoose from "mongoose";
import logging from "./logging";

dotenv.config();

const NAMESPACE = "MongoDB Config";

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  autoIndex: false,
  retryWrites: true,
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || "superuser";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "supersecretpassword1";
const MONGO_URL = process.env.MONGO_URL || `cluster0.menvh.mongodb.net/sample?w=majority`;

const MONGO = {
  host: MONGO_URL,
  password: MONGO_PASSWORD,
  username: MONGO_USERNAME,
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}`,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "coolIssuer";
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || "superencryptedsecret";

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
};

const config = {
  mongo: MONGO,
  server: SERVER,
};

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(config.mongo.url, config.mongo.options);
    logging.info(NAMESPACE, "DuoWings Database is Connected!");
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
  }
};

export default connectToMongoDB;
