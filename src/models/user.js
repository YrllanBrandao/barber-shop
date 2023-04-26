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
        this._checkUser = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, connection_1.default)("user").select().where({ id });
                if (result[0] === undefined) {
                    return false;
                }
                return true;
            }
            catch (erro) {
                return false;
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, email, password, roleId } = req.body;
                const CURRENT_DATE = (0, getCurrentDate_1.default)();
                const REGISTER = {
                    firstName,
                    lastName,
                    email,
                    password: (0, hashPassword_1.default)(password),
                    createdAt: CURRENT_DATE,
                    updatedAt: CURRENT_DATE
                };
                const USER_ID = yield (0, connection_1.default)("users").insert(REGISTER);
                //  adding user role
                yield (0, connection_1.default)('user_role').insert({
                    user_id: USER_ID[0],
                    role_id: roleId
                });
                res.status(201).send("user created sucessfully!");
            }
            catch (error) {
                res.sendStatus(400).send(error.sqlMessage);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params;
                const USER_DATA = req.body;
                const query = yield (0, connection_1.default)('users').select(['email']).where(id);
                if (query.length === 0) {
                    res.status(404).send("the user doesn't exists!");
                }
                const result = yield (0, connection_1.default)('users').update(Object.assign(Object.assign({}, USER_DATA), { updatedAt: (0, getCurrentDate_1.default)() })).where(id);
                res.sendStatus(200).send(result);
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
        this.findById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const query = yield (0, connection_1.default)('users').where({ id });
                res.sendStatus(200).send(query);
            }
            catch (error) {
                res.sendStatus(error).send(error.sqlMessage);
            }
        });
    }
}
exports.default = User;
