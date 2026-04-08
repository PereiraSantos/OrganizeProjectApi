import pool from '../config/database';
import { Task } from '../models/task';

export class TaskService {
    static async initTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(100) NOT NULL,
        id_category INT NOT NULL,
        status INT NOT NULL,
        creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

        await pool.query(sql);
    }

    static async criateTask(name: string, description: string, idCategory: number, status: number): Promise<Task> {
        const sql = 'INSERT INTO tasks (name, description, id_category, status) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [name, description, idCategory, status];
        const { rows } = await pool.query(sql, values);
        return rows[0];
    }

    static async findTaskAll(): Promise<Task[]> {
        const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
        return rows;
    }

    static async updateStatus(id: number, status: number): Promise<boolean> {
        const sql = 'UPDATE tasks set status = $2 where id = $1';
        const values = [id, status];
        const { rows } = await pool.query(sql, values);
        if (rows.length > 0) return true
        return false;

    }
}