const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// add a student

router.post('/add', async (req, res) => {
    try{
        const student = new Student(req.body);
        await student.save();
        res.status(200).json({message: "Student added successfully"});
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

// edit a students
router.get('/', async (req, res) =>{
    try{
        const student = await Student.find();
        res.json(student);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;