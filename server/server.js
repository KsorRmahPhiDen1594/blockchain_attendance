const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/student');
const attendanceRoutes = require('./routes/attendance');
const authRoutes = require('./auth/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes'); // ✅ Thêm dòng này

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/student', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes); // ✅ Thêm dòng này để xử lý vai trò

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/attendance-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

// Default route
app.get('/', (req, res) => {
    res.send("Backend API running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
