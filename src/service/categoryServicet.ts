import pool from '../config/database';
import { Category } from '../models/category';

export class CategoryService {
    static async initTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS categorys (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        color INT NOT NULL,
        creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

        await pool.query(sql);
    }

    static async criateCategory(name: string, color: number): Promise<Category> {
        const sql = 'INSERT INTO categorys (name, color) VALUES ($1, $2) RETURNING *';
        const values = [name, color];
        const { rows } = await pool.query(sql, values);
        return rows[0];
    }

    static async findCategoryAll(): Promise<Category[]> {
        const { rows } = await pool.query('SELECT * FROM categorys ORDER BY id ASC');
        return rows;
    }
}