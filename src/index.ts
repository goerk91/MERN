import express, {Request, Response} from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
let env = process.env["MDB_CONNECT"] || "";

// set up server
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>(console.log(`Server started on Port ${PORT}`)));

app.get("/test", (_req:Request, _res:Response)=>{_res.send("It Works!!")});

// connect to mongoose
mongoose.connect(env, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err)=>{
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
});