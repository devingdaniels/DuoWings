import { NextFunction, Request, Response } from "express";
import { UserModel } from "../mongodb/models/user";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import config from "../config/config";
import logging from "../config/logging";
import IUser from "../interfaces/userInterface";

const NAMESPACE = "Auth Middleware";
const USER_COOKIE_NAME = config.server.userauthcookie;

const signJWT = async (user: IUser): Promise<string> => {
  const timeSinceEpoch = new Date().getTime();
  const expirationTime = timeSinceEpoch + Number(config.server.token.expireTime) * 100000;
  const expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  logging.info(NAMESPACE, `Attempting to sign token for ${user._id}`);

  try {
    const token = jwt.sign(
      {
        id: user._id,
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
    const decoded: JwtPayload = jwt.verify(token, config.server.token.secret) as JwtPayload;

    // Get user from the token
    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ error: "Invalid user" });
    }

    // Everything checks out, proceed to the next middleware
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Token validation error" });
  }
};

export { signJWT, verifyJWT };
