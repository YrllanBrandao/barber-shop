"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const HashPassword = (password) => {
    const ROUNDS = 10;
    const SALT = bcrypt_1.default.genSaltSync(ROUNDS);
    const HASHED_PASSWORD = bcrypt_1.default.hashSync(password, SALT);
    return HASHED_PASSWORD;
};
exports.default = HashPassword;
