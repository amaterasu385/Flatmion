import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

// Express App Initialisierung
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

// Verbindung testen
db.connect((err) => {
  if (err) {
    console.error('Fehler bei der Datenbankverbindung:', err);
    return;
  }
  console.log('Erfolgreich mit der Datenbank verbunden!');
  
  // Test-Query
  db.query('SHOW TABLES', (err, results) => {
    if (err) {
      console.error('Fehler beim Abfragen der Tabellen:', err);
      return;
    }
    console.log('Verfügbare Tabellen:', results);
  });
});