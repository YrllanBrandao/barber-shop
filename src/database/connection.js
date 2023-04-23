"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const knexConfiguration = {
    client: 'mysql2',
    connection: {
        host: '172.17.0.2',
        port: 3306,
        user: 'root',
        password: process.env.DATABASE_PASSWORD,
        database: 'barber_shop',
    },
};
const connection = (0, knex_1.default)(knexConfiguration);
exports.default = connection;
