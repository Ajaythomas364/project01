const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../db');

// Book a hostel
router.post('/', async (req, res) => {
  const { UserId, HostelId } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('UserId', sql.Int, UserId)
      .input('HostelId', sql.Int, HostelId)
      .query(`INSERT INTO HostelBookings (UserId, HostelId)
              VALUES (@UserId, @HostelId)`);
    res.status(201).send({ message: 'Hostel booked successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get all hostel bookings
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`SELECT hb.*, u.Name AS UserName, h.Name AS HostelName
              FROM HostelBookings hb
              JOIN Users u ON u.Id = hb.UserId
              JOIN Hostels h ON h.Id = hb.HostelId`);
    res.send(result.recordset);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(`SELECT * FROM HostelBookings WHERE Id = @Id`);
    if (result.recordset.length === 0) {
      return res.status(404).send({ message: 'Booking not found' });
    }
    res.send(result.recordset[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Cancel booking (change status)
router.put('/:id/cancel', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Id', sql.Int, id)
      .query(`UPDATE HostelBookings SET Status = 'cancelled' WHERE Id = @Id`);
    res.send({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
