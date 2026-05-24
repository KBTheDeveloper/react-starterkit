import { User as UserModel } from "../models/User.js";

declare global {
  namespace Express {
    interface Request {
      user?: UserModel;
    }
  }
}
