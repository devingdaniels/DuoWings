import { UserModel } from "../models/user.model";

export declare global {
  namespace Express {
    interface Request {
      user?: typeof UserModel;
    }
  }
}
