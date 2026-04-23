"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const database_1 = __importDefault(require("../config/database"));
class CategoryService {
    static async initTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS categorys (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        color INT NOT NULL,
        creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
        await database_1.default.query(sql);
    }
    static async criateCategory(name, color) {
        const sql = 'INSERT INTO categorys (name, color) VALUES ($1, $2) RETURNING *';
        const values = [name, color];
        const { rows } = await database_1.default.query(sql, values);
        return rows[0];
    }
    static async findCategoryAll() {
        const { rows } = await database_1.default.query('SELECT * FROM categorys ORDER BY id ASC');
        return rows;
    }
}
exports.CategoryService = CategoryService;
