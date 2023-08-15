import jwt from "jsonwebtoken";
import config from "../config/config";
import logging from "../config/logging";
import { Request, Response, NextFunction } from "express";

const NAMESPACE = "Auth";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Validating token");

  let token = req.cookies.token;

  if (token) {
    jwt.verify(token, config.server.token.secret, (error: jwt.VerifyErrors | null, decoded: any) => {
      if (error) {
        return res.status(404).json({
          message: "Failed to verify token; unauthorized",
          error,
        });
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default verifyToken;
