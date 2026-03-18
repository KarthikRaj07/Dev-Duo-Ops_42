const express = require('express');
const router = express.Router();
const { bookRoom } = require('../controllers/bookingController');

// POST /api/book-room
router.post('/book-room', bookRoom);

module.exports = router;
