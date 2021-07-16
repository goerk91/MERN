"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function auth(_req, _res, _next) {
    try {
        const token = _req.cookies.token;
        const env = process.env["JWT_SECRET"] || "";
        if (!token)
            return _res.status(401).json({
                errorMessage: "Unathorized",
            });
        const verified = jsonwebtoken_1.default.verify(token, env);
        _req.user = verified;
        return _next();
    }
    catch (err) {
        console.error(err);
        return _res.status(401).json({
            errorMessage: "Unathorized",
        });
    }
}
exports.default = auth;
//# sourceMappingURL=auth.js.map