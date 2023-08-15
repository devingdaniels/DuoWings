import jwt from "jsonwebtoken";
import config from "../config/config";
import logging from "../config/logging";
import IUser from "../interfaces/userInterface";

const NAMESPACE = "Auth";

const signJWT = async (user: IUser): Promise<string> => {
  const timeSinceEpoch = new Date().getTime();
  const expirationTime = timeSinceEpoch + Number(config.server.token.expireTime) * 100000;
  const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  logging.info(NAMESPACE, `Attempting to sign token for ${user._id}`);

  try {
    const token = jwt.sign(
      {
        username: user.fname + user.lname,
      },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        algorithm: "HS256",
        expiresIn: expirationTimeInSeconds,
      }
    );

    return token;
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    throw error;
  }
};

export default signJWT;
