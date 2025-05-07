const express = require('express');
const router = express.Router();
const Student = require('../models/Attendance');


// mark Attendance
router.post('/mask', async (req, res) => {
    try{
        const {studentId, present} = req.body;
        const attendance = new Attendance ([studentId, present]);
        await attendance.save();
        res.status(200).json({message: "Attendance marked"});
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

// get Attendance by student
router.get('/"studentId', async (req, res) => {
    try{
        const records = await Attendance.find({ studentId: req.params.studentId});
        req.json(records);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;