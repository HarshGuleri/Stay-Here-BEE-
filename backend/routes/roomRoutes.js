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

// ✅ POST: Check availability of rooms in given date range
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
  const { checkIn, checkOut, userId } = req.body;
  const roomId = req.params.id;

  console.log('Booking Request recieved:', {
    roomId,
    checkIn,
    checkOut,
    userId,
  });

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      console.log('Room not found');
      return res.status(404).json({ error: 'Room not found' });
    }

    const isBooked = room.bookings?.some(booking =>
      new Date(checkIn) < new Date(booking.checkOut) &&
      new Date(checkOut) > new Date(booking.checkIn)
    );

    if (isBooked) {
      console.log('Conflict: Room already booked');
      return res.status(400).json({ error: 'Room is already booked for selected dates' });
    }

    room.bookings.push({ checkIn, checkOut, userId });
    await room.save();

    console.log('✅ Booking successful');
    res.json({ message: 'Room booked successfully', room });
  } catch (error) {
    console.error('❌ Booking error:', error);
    res.status(500).json({ error: 'Failed to book room', details: error.message });
  }
});


// ✅ NEW: GET booked dates for a specific room
router.get('/calendar/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const bookedDates = room.bookings.map(booking => ({
      checkIn: booking.checkIn,
      checkOut: booking.checkOut
    }));

    res.json({ bookedDates });
  } catch (error) {
    console.error('Error fetching booked dates:', error);
    res.status(500).json({ error: 'Failed to fetch calendar data' });
  }
});

// ✅ NEW: GET all bookings for a specific user
router.get('/user-bookings/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Find all rooms that have bookings by this user
    const rooms = await Room.find({
      'bookings.userId': userId
    });

    const userBookings = [];
    
    rooms.forEach(room => {
      room.bookings.forEach(booking => {
        if (booking.userId.toString() === userId) {
          userBookings.push({
            roomId: room._id,
            roomTitle: room.title,
            roomImage: room.image,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            bookingId: booking._id
          });
        }
      });
    });

    // Sort by check-in date (newest first)
    userBookings.sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn));

    res.json({ bookings: userBookings });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ error: 'Failed to fetch user bookings' });
  }
});

module.exports = router;
