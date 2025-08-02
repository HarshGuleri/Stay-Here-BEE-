const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], default: '' },
    profileImage: { type: String, default: '' },
});

module.exports = mongoose.model('users', userSchema);
