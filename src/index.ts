import express, {Request, Response} from "express";

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>(console.log(`Server started on Port ${PORT}`)));

app.get("/test", (_req:Request, _res:Response)=>{_res.send("It Works!!")});