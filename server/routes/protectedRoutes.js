const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware');
const checkRole = require('../auth/checkRole');

// Chỉ admin được phép truy cập
router.get('/admin-data', authMiddleware, checkRole(['admin']), (req, res) => {
  res.json({ message: 'Welcome, Admin!', user: req.teacher });
});

// Teacher và admin đều được phép truy cập
router.get('/teacher-data', authMiddleware, checkRole(['teacher', 'admin']), (req, res) => {
  res.json({ message: 'Welcome, Teacher!', user: req.teacher });
});

// Student, teacher và admin đều được phép truy cập
router.get('/student-data', authMiddleware, checkRole(['student', 'teacher', 'admin']), (req, res) => {
  res.json({ message: 'Welcome, Student!', user: req.teacher });
});

module.exports = router;
