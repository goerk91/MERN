import express, { Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";

export const router = express.Router();

router.get("/", async (_req: Request, _res: Response) => {
  try {
    const { email, password, passwordVerify } = _req.body;
    console.log(email);
    console.log(password);
    console.log(passwordVerify);
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

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email,
      passwordHash: passwordHash,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    return _res.send("User saved");
  } catch (err) {
    console.error(err);
    return _res.status(500).send();
  }
});
