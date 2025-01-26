
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/menu-app').then(() => console.log('Connected to MongoDB')).catch(err => console.error('MongoDB connection error:', err));
};

module.exports = { connectDB };
