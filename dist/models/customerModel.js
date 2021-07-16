"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
});
exports.Customer = mongoose_1.model("Customer", CustomerSchema);
//# sourceMappingURL=customerModel.js.map