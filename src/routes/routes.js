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
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const role_1 = __importDefault(require("../models/role"));
const adminAuth_1 = __importDefault(require("../middleware/adminAuth"));
const Router = express_1.default.Router();
// user routes
Router.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.default();
    user.create(req, res);
}));
Router.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.default();
    user.findAll(req, res);
}));
Router.get("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.default();
    user.findById(req, res);
}));
Router.put("/user/:id", adminAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.default();
    user.update(req, res);
}));
// role routes
Router.get("/roles", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = new role_1.default();
    role.findAll(req, res);
}));
Router.post("/role", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = new role_1.default();
    role.create(req, res);
}));
Router.put("/role/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = new role_1.default();
    role.update(req, res);
}));
Router.delete("/role/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = new role_1.default();
    role.delete(req, res);
}));
exports.default = Router;
