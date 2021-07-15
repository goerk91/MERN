import express, { Request, Response } from "express";
import { Customer } from "../models/customerModel";
import auth from "../middleware/auth";

const customerRouter = express.Router();

customerRouter.post("/", auth, async (_req: Request, _res: Response) => {
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

customerRouter.get("/", auth, async (_req: Request, _res: Response) => {
  try {
    //find gives all Customers
    const allCustomer = await Customer.find();

    return _res.json(allCustomer);
  } catch (err) {
    console.error(err);
    return _res.status(500).send();
  }
});

export default customerRouter;
