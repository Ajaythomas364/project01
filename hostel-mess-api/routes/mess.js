const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../db');

// Add new mess
router.post('/', async (req, res) => {
  const { OwnerId, Name, FoodType, PricePerMonth, Address, City } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input("OwnerId", sql.Int, OwnerId)
      .input("Name", sql.NVarChar, Name)
      .input("FoodType", sql.NVarChar, FoodType)
      .input("PricePerMonth", sql.Decimal(10, 2), PricePerMonth)
      .input("Address", sql.NVarChar, Address)
      .input("City", sql.NVarChar, City)
      .query(`INSERT INTO Mess (OwnerId, Name, FoodType, PricePerMonth, Address, City)
              VALUES (@OwnerId, @Name, @FoodType, @PricePerMonth, @Address, @City)`);
    res.status(201).send({ message: "Mess added successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get all mess
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query("SELECT * FROM Mess");
    res.send(result.recordset);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get mess by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("Id", sql.Int, id)
      .query("SELECT * FROM Mess WHERE Id = @Id");
    if (result.recordset.length === 0) {
      return res.status(404).send({ message: "Mess not found" });
    }
    res.send(result.recordset[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update mess
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { Name, FoodType, PricePerMonth, Address, City } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input("Id", sql.Int, id)
      .input("Name", sql.NVarChar, Name)
      .input("FoodType", sql.NVarChar, FoodType)
      .input("PricePerMonth", sql.Decimal(10, 2), PricePerMonth)
      .input("Address", sql.NVarChar, Address)
      .input("City", sql.NVarChar, City)
      .query(`UPDATE Mess SET 
        Name = @Name, FoodType = @FoodType, PricePerMonth = @PricePerMonth, 
        Address = @Address, City = @City WHERE Id = @Id`);
    res.send({ message: "Mess updated successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete mess
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input("Id", sql.Int, id)
      .query("DELETE FROM Mess WHERE Id = @Id");
    res.send({ message: "Mess deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
