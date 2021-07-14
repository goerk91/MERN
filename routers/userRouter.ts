import express, { Request, Response } from "express";
import { User } from "../models/userModel";

export const router = express.Router();

router.get("/", async (_req: Request, _res: Response) => {
  try {
    const { email, password, passwordVerify } = _req.body;

    if (!email || !password || !passwordVerify) {
      return _res
        .status(400)
        .json({ errorMessage: "Please enter all required fields!" });
    }
    if (password.length < 6) {
      return _res.status(400).json({
        errorMessage: "Please enter a passwort at least 6 characters!",
      });
    }
    if (password !== passwordVerify) {
      _res
        .status(400)
        .json({ errorMessage: "Please enter the same Password!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return _res
        .status(400)
        .json({ errorMessage: "An Account with this email already exists!" });
    }
    return; // still not working...
  } catch (err) {
    console.error(err);
    return _res.status(500).send();
  }
});
