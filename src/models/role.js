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
class Role {
    constructor() {
        this.checkRole = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, connection_1.default)("roles").select().where({ id });
                if (result[0] === undefined) {
                    return false;
                }
                return true;
            }
            catch (error) {
                return error;
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { roleName } = yield req.body;
                if (!roleName) {
                    res.sendStatus(400);
                }
                else {
                    const role = yield (0, connection_1.default)('roles').insert({ role_name: roleName });
                    res.status(201).send(`Role ${role} created.`);
                }
            }
            catch (error) {
                res.status(400).send(error.sqlMessage);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const roleExist = yield this.checkRole(id);
            if (!roleExist) {
                res.status(404).send("The role doesn't exist");
            }
            try {
                yield (0, connection_1.default)("roles").delete("*").where({ id });
                res.status(200).send("role deleted!");
            }
            catch (error) {
                res.status(400).send(error.sqlMessage);
            }
        });
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield (0, connection_1.default)("roles").select();
                res.status(200).send(roles);
            }
            catch (error) {
                res.status(400).send(error.sqlMessage);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { roleName } = yield req.body;
                const newRole = {
                    id,
                    role_name: roleName,
                    updatedAt: (0, getCurrentDate_1.default)()
                };
                if (!roleName) {
                    res.status(400).send("The fild roleName was empty");
                }
                yield (0, connection_1.default)("roles").update(newRole).where({ id });
                res.status(200).send('The fild role_name was updated!');
            }
            catch (error) {
                res.status(400).send(error.sqlMessage);
            }
        });
    }
}
exports.default = Role;
