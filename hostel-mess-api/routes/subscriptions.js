const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../db');

// Subscribe to a mess
router.post('/', async (req, res) => {
  const { UserId, MessId } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('UserId', sql.Int, UserId)
      .input('MessId', sql.Int, MessId)
      .query(`INSERT INTO MessSubscriptions (UserId, MessId)
              VALUES (@UserId, @MessId)`);
    res.status(201).send({ message: 'Subscribed to mess successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get all mess subscriptions
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`SELECT ms.*, u.Name AS UserName, m.Name AS MessName
              FROM MessSubscriptions ms
              JOIN Users u ON u.Id = ms.UserId
              JOIN Mess m ON m.Id = ms.MessId`);
    res.send(result.recordset);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get subscription by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Id', sql.Int, id)
      .query(`SELECT * FROM MessSubscriptions WHERE Id = @Id`);
    if (result.recordset.length === 0) {
      return res.status(404).send({ message: 'Subscription not found' });
    }
    res.send(result.recordset[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Cancel subscription
router.put('/:id/cancel', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Id', sql.Int, id)
      .query(`UPDATE MessSubscriptions SET Status = 'cancelled' WHERE Id = @Id`);
    res.send({ message: 'Subscription cancelled successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
