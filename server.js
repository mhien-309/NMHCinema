import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(32)
  )
`);

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Email đã tồn tại hoặc lỗi hệ thống' });
      }
      res.json({ message: 'Đăng ký thành công' });
    }
  );
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query(
    'SELECT id, name, email FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Lỗi hệ thống' });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: 'Email hoặc mật khẩu không đúng' });
      }
      res.json({ user: results[0] });
    }
  );
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
