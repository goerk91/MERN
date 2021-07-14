"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userModel_1 = require("../models/userModel");
exports.router = express_1.default.Router();
exports.router.get("/", async (_req, _res) => {
    try {
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
        const existingUser = await userModel_1.User.findOne({ email });
        if (existingUser) {
            return _res
                .status(400)
                .json({ errorMessage: "An Account with this email already exists!" });
        }
        return;
    }
    catch (err) {
        console.error(err);
        return _res.status(500).send();
    }
});
//# sourceMappingURL=userRouter.js.map