const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require("./db");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();



// Routes
app.use('/', require('./routes/authRoute'));
app.use('/', require('./routes/menuRoute'));
app.use('/', require('./routes/orderRoute'));


// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));