import { NextFunction, Request, Response } from "express";
import { UserModel } from "../mongodb/models/userModel";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import config from "../config/config";
import logging from "../config/logging";

const NAMESPACE = "Auth Middleware";
const USER_COOKIE_NAME = config.server.userauthcookie;

const signJWT = async (_id: string): Promise<string> => {
  const timeSinceEpoch = new Date().getTime();
  const expirationTime = timeSinceEpoch + Number(config.server.token.expireTime) * 100000;
  const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  logging.info(NAMESPACE, `Attempting to sign token for user with ID: ${_id}`);

  try {
    const token = jwt.sign(
      {
        id: _id,
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

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `Verifying JWT`);
  try {
    // Get token from cookie
    const token = req.cookies[USER_COOKIE_NAME];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify token
    // Params: token, secret, options
    const decoded: JwtPayload = jwt.verify(token, config.server.token.secret) as JwtPayload;

    // Decode the token to get unique user id
    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ error: "Invalid user" });
    }
    // Add user to request object
    req.user = user;
    // Call next middleware
    next();
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(401).json({ error: "Verification failed, invalid user token" });
  }
};

export { signJWT, verifyJWT };
