import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "../routers/userRouter";
import customerRouter from "../routers/customerRouter";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
let env = process.env["MDB_CONNECT"] || "";

// set up server
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));

// any incomming request will be checked, if it has a json-Object in the body - it will parsed into _req.body
app.use(express.json());
// any incomming request will be checked, if it has cookies - it will parsed into _req.cookies
app.use(cookieParser());
// allow acces for req/res to the server
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.get("/test", (_req: Request, _res: Response) => {
  _res.send("It Works!!!");
});

// connect to mongoose
mongoose.connect(
  env,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

// set up routes

app.use("/auth", userRouter);
app.use("/customer", customerRouter);
