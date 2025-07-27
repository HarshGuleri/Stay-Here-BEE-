const express = require('express');
const Room = require('../models/Room');
const router = express.Router();

// ✅ POST: Add a new room
router.post('/add', async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json({ message: 'Room added successfully', room });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add room' });
  }
});

// ✅ GET: Fetch all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// ✅ POST: Check availability
router.post('/check-availability', async (req, res) => {
  const { checkIn, checkOut } = req.body;

  try {
    const rooms = await Room.find();

    const availableRooms = rooms.filter(room => {
      const isBooked = room.bookings?.some(booking =>
        new Date(checkIn) < new Date(booking.checkOut) &&
        new Date(checkOut) > new Date(booking.checkIn)
      );
      return !isBooked;
    });

    res.json(availableRooms);
  } catch (error) {
    res.status(500).json({ error: 'Error checking availability' });
  }
});

// ✅ POST: Book a room by ID
router.post('/book/:id', async (req, res) => {
  const { checkIn, checkOut } = req.body;
  const roomId = req.params.id;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    // Optional: check if dates overlap
    const isBooked = room.bookings?.some(booking =>
      new Date(checkIn) < new Date(booking.checkOut) &&
      new Date(checkOut) > new Date(booking.checkIn)
    );

    if (isBooked) {
      return res.status(400).json({ error: 'Room is already booked for selected dates' });
    }

    // Push new booking
    room.bookings.push({ checkIn, checkOut, userId });
    await room.save();

    res.json({ message: 'Room booked successfully', room });
  } catch (error) {
    res.status(500).json({ error: 'Failed to book room' });
  }
});

module.exports = router;
