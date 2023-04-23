"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminAuth = (req, res, next) => {
    const bearer = req.headers['authorization'];
    const ADMIN_ROLE_ID = 1;
    const token = bearer.split(' ')[1];
    const secret = process.env.SECRET_JWT;
    jsonwebtoken_1.default.verify(token, secret, ((error, decoded) => {
        if (error) {
            res.status(401).send("Unauthorized");
        }
        if (decoded.role === ADMIN_ROLE_ID) {
            next();
        }
    }));
};
exports.default = adminAuth;
