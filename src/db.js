import pkg from 'pg';
const {Pool} = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const query = (text, params) => {
    return pool.query(text, params);
}

const initializeDatabase = async () => {
    try {
        await query(`
            CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
            );

            CREATE TABLE otps (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            otp VARCHAR(10) NOT NULL,
            used BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expires_at TIMESTAMP NOT NULL
            );
        `);
        console.log('Database tables created or already exists.');
    } catch (error) {
        console.error(error);
    }
}

initializeDatabase();

export default pool;