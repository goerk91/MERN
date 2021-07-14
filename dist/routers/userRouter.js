"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.router = express_1.default.Router();
exports.router.post("/", async (_req, _res) => {
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
        const salt = await bcrypt_1.default.genSalt();
        const passwordHash = await bcrypt_1.default.hash(password, salt);
        const newUser = new userModel_1.User({
            email: email,
            passwordHash: passwordHash,
        });
        const savedUser = await newUser.save();
        console.log(savedUser);
        return _res.send("User saved");
    }
    catch (err) {
        console.error(err);
        return _res.status(500).send();
    }
});
//# sourceMappingURL=userRouter.js.map