"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const _1 = __importDefault(require("."));
const port = process.env.PORT || 3000;
_1.default.listen(port, () => {
    console.log(`server listening on port: ${port}`);
});
module.exports = _1.default;
