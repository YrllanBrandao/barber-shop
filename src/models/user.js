"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const getCurrentDate_1 = __importDefault(require("../../public/javascript/getCurrentDate"));
const hashPassword_1 = __importDefault(require("../../public/javascript/hashPassword"));
class User {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, email, password } = req.body;
                const CURRENT_DATE = (0, getCurrentDate_1.default)();
                const REGISTER = {
                    firstName,
                    lastName,
                    email,
                    password: (0, hashPassword_1.default)(password),
                    createdAt: CURRENT_DATE,
                    updatedAt: CURRENT_DATE
                };
                yield (0, connection_1.default)("users").insert(REGISTER);
                res.status(201).send("user created sucessfully!");
            }
            catch (error) {
                res.status(400).send(error.sqlMessage);
            }
        });
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const USERS = yield (0, connection_1.default)('users').select('*');
                res.status(200).json(USERS);
            }
            catch (error) {
                res.status(400).send(error.sqlMessage);
            }
        });
    }
}
exports.default = User;
