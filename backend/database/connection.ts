import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT)
}

const pool = mysql.createPool(dbConfig);

export async function connectToDatabase() {
    try {
        const connection = await pool.getConnection();
        console.log(`✅ Connected to Database: ${process.env.DB_DATABASE} on Port: ${process.env.DB_PORT}`);
        connection.release();
        return true;
    } catch (error) {
        console.log(`❌ Connection failed!`);
        if (error instanceof Error) {
            console.error(`🔍 ${error.message}`);
        } else {
            console.error('🔍 Ein unbekannter Fehler ist aufgetreten');
        }
        return false;
    }
}

export default pool;