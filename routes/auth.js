const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const sql = require('mssql');
const db = require('../config/db');

router.get('/login', (req, res) => res.render('login'));
router.get('/signup', (req, res) => res.render('signup'));

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const pool = await db;
    await pool.request()
      .input('name', sql.NVarChar, name)
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, hashedPassword)
      .query('INSERT INTO Users (name, email, password) VALUES (@name, @email, @password)');
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.send('Error during signup');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const pool = await db;
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE email = @email');
    const user = result.recordset[0];
    if (user && await bcrypt.compare(password, user.password)) {
      res.redirect('/health/dashboard');
    } else {
      res.send('Invalid credentials');
    }
  } catch (err) {
    console.error(err);
    res.send('Login error');
  }
});

module.exports = router;
