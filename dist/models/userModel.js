"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
});
exports.User = mongoose_1.model("User", UserSchema);
//# sourceMappingURL=userModel.js.map