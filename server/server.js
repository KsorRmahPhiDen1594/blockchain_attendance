const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/student');
const attendanceRoutes = require('./routes/attendance');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use('/api/student', studentRoutes);
app.use('/api/attendance', attendanceRoutes);

// Connent to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/attendance-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDb connection error:", err);
});

// Routes
const authRoutes = require("./auth/authRoutes");
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) =>{
    res.send("Backend API running");
});

app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}`);
});
