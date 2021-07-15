import { model, Schema, Model, Document } from "mongoose";

interface ICustomer extends Document {
  name: string;
}

const CustomerSchema: Schema = new Schema({
  name: { type: String, required: true },
});

export const Customer: Model<ICustomer> = model("Customer", CustomerSchema);
