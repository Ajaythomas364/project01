const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../db');

// Add a new hostel
router.post('/', async (req, res) => {
  const { OwnerId, Name, Address, City, PricePerMonth, TotalRooms, AvailableRooms } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input("OwnerId", sql.Int, OwnerId)
      .input("Name", sql.NVarChar, Name)
      .input("Address", sql.NVarChar, Address)
      .input("City", sql.NVarChar, City)
      .input("PricePerMonth", sql.Decimal(10, 2), PricePerMonth)
      .input("TotalRooms", sql.Int, TotalRooms)
      .input("AvailableRooms", sql.Int, AvailableRooms)
      .query(`INSERT INTO Hostels (OwnerId, Name, Address, City, PricePerMonth, TotalRooms, AvailableRooms)
              VALUES (@OwnerId, @Name, @Address, @City, @PricePerMonth, @TotalRooms, @AvailableRooms)`);
    res.status(201).send({ message: "Hostel added successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get all hostels
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query("SELECT * FROM Hostels");
    res.send(result.recordset);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get hostel by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("Id", sql.Int, id)
      .query("SELECT * FROM Hostels WHERE Id = @Id");
    if (result.recordset.length === 0) {
      return res.status(404).send({ message: "Hostel not found" });
    }
    res.send(result.recordset[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update hostel
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { Name, Address, City, PricePerMonth, TotalRooms, AvailableRooms } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input("Id", sql.Int, id)
      .input("Name", sql.NVarChar, Name)
      .input("Address", sql.NVarChar, Address)
      .input("City", sql.NVarChar, City)
      .input("PricePerMonth", sql.Decimal(10, 2), PricePerMonth)
      .input("TotalRooms", sql.Int, TotalRooms)
      .input("AvailableRooms", sql.Int, AvailableRooms)
      .query(`UPDATE Hostels SET 
        Name = @Name, Address = @Address, City = @City, 
        PricePerMonth = @PricePerMonth, TotalRooms = @TotalRooms, 
        AvailableRooms = @AvailableRooms WHERE Id = @Id`);
    res.send({ message: "Hostel updated successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete hostel
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input("Id", sql.Int, id)
      .query("DELETE FROM Hostels WHERE Id = @Id");
    res.send({ message: "Hostel deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
