const express = require('express');
const Room = require('../models/Room');
const router = express.Router();

// POST: Add a new room
router.post('/add', async (req, res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).json({ message: 'Room added successfully', room });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add room' });
    }
});

// GET: Fetch all rooms
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
});

module.exports = router;
