"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouter_1 = require("../routers/userRouter");
dotenv_1.default.config();
let env = process.env["MDB_CONNECT"] || "";
const app = express_1.default();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
app.use(express_1.default.json());
app.get("/test", (_req, _res) => {
    _res.send("It Works!!!");
});
mongoose_1.default.connect(env, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err)
        return console.error(err);
    console.log("Connected to MongoDB");
});
app.use("/auth", userRouter_1.router);
//# sourceMappingURL=index.js.map