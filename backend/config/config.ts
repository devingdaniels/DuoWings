import dotenv from "dotenv";

dotenv.config();

const NAMESPACE = "MongoDB Config";

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000, // Close sockets after 30 seconds of inactivity
  autoIndex: false, //! Don't build indexes?
  retryWrites: true, // Retry writes if connection is lost
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
const SERVER_USER_COOKIE_NAME = process.env.SERVER_USER_COOKIE_NAME || "user_token";

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  namespace: NAMESPACE,
  userauthcookie: SERVER_USER_COOKIE_NAME,
  token: {
    expireTime: parseInt(SERVER_TOKEN_EXPIRETIME as string),
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
};

const config = {
  mongo: MONGO,
  server: SERVER,
};

export default config;
