"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = __importDefault(require("../config/database"));
class UserService {
    static async initTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
        await database_1.default.query(sql);
    }
    static async criateUser(email, password) {
        const sql = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
        const values = [email, password];
        const { rows } = await database_1.default.query(sql, values);
        return rows[0];
    }
    static async findUserAll() {
        const { rows } = await database_1.default.query('SELECT * FROM users ORDER BY id ASC');
        return rows;
    }
    static async findUserByEmaiByPassword(email, password) {
        const sql = 'SELECT * FROM users where email = $1 and password = $2';
        const values = [email, password];
        const { rows } = await database_1.default.query(sql, values);
        if (rows.length > 0)
            return true;
        return false;
    }
}
exports.UserService = UserService;
