"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const database_1 = __importDefault(require("../config/database"));
class ProjectService {
    static async initTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(100) NOT NULL,
        creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
        await database_1.default.query(sql);
    }
    static async criateProject(name, description) {
        const sql = 'INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING *';
        const values = [name, description];
        const { rows } = await database_1.default.query(sql, values);
        return rows[0];
    }
    static async findProjectAll() {
        const { rows } = await database_1.default.query('SELECT * FROM projects ORDER BY id ASC');
        return rows;
    }
}
exports.ProjectService = ProjectService;
