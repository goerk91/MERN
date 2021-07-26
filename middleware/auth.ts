import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function auth(_req: Request, _res: Response, _next: NextFunction) {
  try {
    const token = _req.cookies.token;
    const env = process.env["JWT_SECRET"] ?? "";

    if (!token)
      return _res.status(401).json({
        errorMessage: "Unathorized",
      });

    const verified = jwt.verify(token, env);
    _req.user = verified;
    return _next();
  } catch (err) {
    console.error(err);
    return _res.status(401).json({
      errorMessage: "Unathorized",
    });
  }
}

export default auth;
