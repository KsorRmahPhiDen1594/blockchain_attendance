const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt');
require('dotenv').config();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: teacher._id, email: teacher.email, role: teacher.role }, // Thêm role vào payload
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, teacher: { email: teacher.email, name: teacher.name, role: teacher.role } }); // Thêm role vào response
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const register = async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = new Teacher({ email, password: hashedPassword, name, role });
    await newTeacher.save();

    res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration error', error: err.message });
  }
};

module.exports = { login, register };
