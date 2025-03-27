const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../db');

// Register
router.post('/register', async (req, res) => {
  const { Name, Email, Password, Phone, Role } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input("Name", sql.NVarChar, Name)
      .input("Email", sql.NVarChar, Email)
      .input("Password", sql.NVarChar, Password)
      .input("Phone", sql.NVarChar, Phone)
      .input("Role", sql.NVarChar, Role)
      .query(`INSERT INTO Users (Name, Email, Password, Phone, Role)
              VALUES (@Name, @Email, @Password, @Phone, @Role)`);
    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("Email", sql.NVarChar, Email)
      .input("Password", sql.NVarChar, Password)
      .query(`SELECT * FROM Users WHERE Email = @Email AND Password = @Password`);
    if (result.recordset.length === 0) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    res.send(result.recordset[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
