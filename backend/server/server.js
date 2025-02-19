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

// Middleware
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT} \n`);
}); 

// Verbindung testen
db.connect((err) => {
  if (err) {
    console.error('Fehler bei der Datenbankverbindung:', err);
    return;
  }
  console.log('Erfolgreich mit der Datenbank verbunden! \n');
  
  // Test-Query
  db.query('SHOW TABLES', (err, results) => {
    if (err) {
      console.error('Fehler beim Abfragen der Tabellen:', err);
      return;
    }
    console.log('Verfügbare Tabellen:', results);
  });
});

// Endpunkte

app.post('/api/login', async (req, res) => {
  const { userName, keyWord } = req.body; // Benutzernamen und Passwort aus dem Request-Body extrahieren

  try {
    // Überprüfen, ob die Anmeldedaten in der Datenbank vorhanden sind
    db.query('SELECT u.userId, u.roleId FROM Passwords p JOIN Users u ON p.userId = u.userId WHERE p.userName = ? AND p.keyWord = ?', [userName, keyWord], (err, results) => {
      if (err) {
        console.error('Fehler bei der Abfrage der Passwörter:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.length > 0) {
        // Anmeldedaten sind korrekt, roleId zurückgeben
        const { userId, roleId } = results[0];
        res.status(200).json({ message: 'Login erfolgreich!', userId, roleId });
      } else {
        // Anmeldedaten sind falsch
        res.status(401).json({ error: 'Ungültige Anmeldedaten!' });
      }
    });
  } catch (error) {
    console.error('Login Fehler:', error);
    res.status(500).json({ error: 'Login fehlgeschlagen!' });
  }
});