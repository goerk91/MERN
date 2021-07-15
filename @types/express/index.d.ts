import { IUser } from "../../models/userModel";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: string | jwt.JwtPayload;
    }
  }
}
