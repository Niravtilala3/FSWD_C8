const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/', async (req, res, next) => {
    const students = await Student.find();
    res.render('students/index', { title: 'Students', students });
});

router.get('/new', (req, res) => {
  res.render('students/new', { title: 'Create Student' });
});

router.post('/', async (req, res, next) => {
    const student = await Student.create({
      name: req.body.name,
      rollNumber: req.body.rollNumber,
      address: req.body.address,
    });
    // res.send('Student created successfully');
    res.redirect(`/students`);
});

router.get('/:studentId', async (req, res, next) => {
    const student = await Student.findById(req.params.studentId);
    const title = 'Student Details';
    if (!student) {
      return res.status(404).render('404', { title: 'Student Not Found' });
    }
    //res.send(student);
    res.render('students/show', { title, student });
});

router.get('/:studentId/edit', async (req, res, next) => {
    const student = await Student.findById(req.params.studentId);
    const title = 'Edit Student';
    if (!student) {
      return res.status(404).render('404', { title: 'Student Not Found' });
    }
    res.render('students/edit', { title, student });
});

router.post('/:studentId/edit', async (req, res) => {
    await Student.findByIdAndUpdate(
      req.params.studentId,
      {
        name: req.body.name,
        rollNumber: req.body.rollNumber,
        address: req.body.address
      }
    );
    res.redirect('/students')
});

router.post('/:studentId/delete', async (req, res) => {
    await Student.findByIdAndDelete(req.params.studentId);
    res.redirect('/students');
});

module.exports = router;