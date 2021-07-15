import express, { Request, Response } from "express";
import { Customer } from "../models/customerModel";

const customerRouter = express.Router();

customerRouter.post("/", async (_req: Request, _res: Response) => {
  try {
    const { name } = _req.body;

    const newCustomer = new Customer({
      name: name,
    });

    const saveCustomer = await newCustomer.save();
    return _res.json(saveCustomer);
  } catch (err) {
    console.error(err);
    return _res.status(500).send();
  }
});

export default customerRouter;
