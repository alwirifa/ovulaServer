import express from 'express';
import mysql from 'mysql2/promise'; // Import mysql2 promise version
import bcrypt from 'bcrypt';


const router = express.Router();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost', // Change this to your MySQL host
  user: 'root',      // Change this to your MySQL username
  password: '',  // Change this to your MySQL password
  database: 'ovulasi_db' // Change this to your MySQL database name
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Use pool to execute queries
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

    if (rows.length > 0) {
      res.status(200).json({
        error: false,
        message: "success",
        data: rows[0]
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Invalid email or password"
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login-admin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch the user details from the database
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND is_admin = 1', [email]);

    // Check if the user exists
    if (rows.length <= 0) {
      return res.status(400).json({
        message: "You are not an admin or user not found"
      });
    }

    const user = rows[0];

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Wrong email or password"
      });
    }

    // Send success response
    res.status(200).json({
      error: false,
      message: "Login successful",
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/register-admin', async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Use pool to execute queries
    const result = await pool.query('INSERT INTO users (name, email, password, age, is_admin) VALUES (?, ?, ?, ?, ?)', [name, email, hashedPassword, age, true]);

    res.status(201).json({
      error: false,
      message: "Admin registration successful",
      data: result[0]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    // Use pool to execute queries
    const result = await pool.query('INSERT INTO users (name, email, password, age) VALUES (?, ?, ?, ?)', [name, email, password, age]);

    res.status(201).json({
      error: false,
      message: "success",
      data: result[0]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/register-admin', async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    // Use pool to execute queries
    const result = await pool.query('INSERT INTO users (name, email, password, age, is_admin) VALUES (?, ?, ?, ?)', [name, email, password, age, true]);

    res.status(201).json({
      error: false,
      message: "success",
      data: result[0]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const { userId } = req.body; // Assuming you have a userId

    // Use pool to execute queries
    const result = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

    res.status(200).json({
      error: false,
      message: "success",
      data: result[0]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/logout', async (req, res) => {
  try {
    // No need to query for logout

    res.status(200).json({
      error: false,
      message: "success",
      data: {}
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create article
router.post('/article', async (req, res) => {
  try {
    const { title, body } = req.body;
    const result = await pool.query("INSERT INTO articles (title, body) VALUES (?, ?)", [title, body]);
    res.status(201).json({
      error: false,
      message: "Article created successfully",
      data: result[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read all articles
router.get('/articles', async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM articles");
    res.status(200).json({
      error: false,
      message: "Articles retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update article
router.put('/article/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    await pool.query("UPDATE articles SET title = ?, body = ? WHERE id = ?", [title, body, id]);
    res.status(200).json({
      error: false,
      message: "Article updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete article
router.delete('/article/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM articles WHERE id = ?", [id]);
    res.status(200).json({
      error: false,
      message: "Article deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;