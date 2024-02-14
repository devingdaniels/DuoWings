import { UserModel } from "../models/user.model";

/* 
/ This file is used to extend the Express Request type
/ For example, we can add a user property to the Request type in the express middleware file: backend/middleware/auth.ts
*/

export declare global {
  namespace Express {
    interface Request {
      user?: typeof UserModel;
    }
  }
}
