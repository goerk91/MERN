import express, { Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

// register
userRouter.post("/", async (_req: Request, _res: Response) => {
  try {
    let env = process.env["JWT_SECRET"] || "";
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

    // hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user to DB
    const newUser = new User({
      email: email,
      passwordHash: passwordHash,
    });

    const savedUser = await newUser.save();

    // sign the token
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      env
    );
    console.log(token);

    // send the token in a HTTP-cookie
    return _res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send("user saved!");
  } catch (err) {
    console.error(err);
    return _res.status(500).send();
  }
});

// log in
userRouter.post("/login", async (_req: Request, _res: Response) => {
  try {
    const { email, password } = _req.body;
    let env = process.env["JWT_SECRET"] || "";

    //validate
    if (!email || !password) {
      return _res
        .status(400)
        .json({ errorMessage: "Please enter all required fields!" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return _res.status(401).json({ errorMessage: "Wrong email or password" });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect) {
      return _res.status(401).json({ errorMessage: "Wrong email or password" });
    }

    // sign the token
    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      env
    );
    // console.log(token);

    // send the token in a HTTP-cookie
    return _res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send("Login was successful!");
  } catch (err) {
    console.error(err);
    return _res.status(500).send("Wtf");
  }
});

// logout
userRouter.get("/logout", (_req: Request, _res: Response) => {
  _res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send("logout");
});

//logedIn check, if the user is LogedIn and shows customer in the frontend depending on the status
userRouter.get("/loggedIn", (_req: Request, _res: Response) => {
  try {
    const token = _req.cookies.token;
    const env = process.env["JWT_SECRET"] || "";

    if (!token) return _res.json(false);

    jwt.verify(token, env);

    return _res.send(true);
  } catch (err) {
    console.error(err);
    return _res.json(false);
  }
});

export default userRouter;
