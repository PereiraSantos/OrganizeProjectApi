import pool from '../config/database';
import { User } from '../models/user';

export class UserService {
    static async initTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

        await pool.query(sql);
    }

    static async criateUser(email: string, password: string): Promise<User> {
        const sql = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
        const values = [email, password];
        const { rows } = await pool.query(sql, values);
        return rows[0];
    }

    static async findUserAll(): Promise<User[]> {
        const { rows } = await pool.query('SELECT * FROM users ORDER BY id ASC');
        return rows;
    }

    static async findUserByEmaiByPassword(email: string, password: string): Promise<boolean> {
        const sql = 'SELECT * FROM users where email = $1 and password = $2';
        const values = [email, password];
        const { rows } = await pool.query(sql, values);
        if (rows.length > 0) return true
        return false;

    }
}