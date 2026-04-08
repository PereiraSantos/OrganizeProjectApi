import pool from '../config/database';
import { Project } from '../models/project';

export class ProjectService {
    static async initTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(100) NOT NULL,
        creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

        await pool.query(sql);
    }

    static async criateProject(name: string, description: string): Promise<Project> {
        const sql = 'INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING *';
        const values = [name, description];
        const { rows } = await pool.query(sql, values);
        return rows[0];
    }

    static async findProjectAll(): Promise<Project[]> {
        const { rows } = await pool.query('SELECT * FROM projects ORDER BY id ASC');
        return rows;
    }
}