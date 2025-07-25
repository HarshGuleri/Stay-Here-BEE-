// server.js
require('dotenv').config(); // Load environment variables from .env
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000' // Change this to your frontend's URL
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Import Routes
const roomRoutes = require('./routes/roomRoutes');
app.use('/api/rooms', roomRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);  // This adds routes for registration and login

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
