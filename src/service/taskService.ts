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
        id_project INT NOT NULL,
        status INT NOT NULL,
        creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

        await pool.query(sql);
    }

    static async criateTask(name: string, description: string, idCategory: number, idProject: number, status: number): Promise<Task> {
        const sql = 'INSERT INTO tasks (name, description, id_category, id_project, status) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [name, description, idCategory, idProject, status];
        const { rows } = await pool.query(sql, values);
        return rows[0];
    }

    static async findTaskAll(id: number): Promise<Task[]> {
        const sql = 'SELECT * FROM tasks where id_project = $1 ORDER BY id ASC';
        const values = [id];
        const { rows } = await pool.query(sql, values);
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