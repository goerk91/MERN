"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customerModel_1 = require("../models/customerModel");
const auth_1 = __importDefault(require("../middleware/auth"));
const customerRouter = express_1.default.Router();
customerRouter.post("/", auth_1.default, async (_req, _res) => {
    try {
        const { name } = _req.body;
        const newCustomer = new customerModel_1.Customer({
            name: name,
        });
        const saveCustomer = await newCustomer.save();
        return _res.json(saveCustomer);
    }
    catch (err) {
        console.error(err);
        return _res.status(500).send();
    }
});
customerRouter.get("/", auth_1.default, async (_req, _res) => {
    try {
        const allCustomer = await customerModel_1.Customer.find();
        return _res.json(allCustomer);
    }
    catch (err) {
        console.error(err);
        return _res.status(500).send();
    }
});
exports.default = customerRouter;
//# sourceMappingURL=customerRouter.js.map