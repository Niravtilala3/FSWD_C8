const express = require('express');
const router = express.Router();
const studentCtl = require('../controllers/studentController');

// GET /students
router.get('/', studentCtl.studentRootFun);
// GET create new student form
router.get('/new', studentCtl.studentNewForm);
// POST create new student
router.post('/', studentCtl.studentCreate);
// GET individual student
router.get('/:studentId', studentCtl.studentView);
// GET edit student form
router.get('/:studentId/edit', studentCtl.studentEditForm);
// POST update student
router.post('/:studentId/edit', studentCtl.studentEdit);
// POST delete student  
router.post('/:studentId/delete',studentCtl.studentDelete);

module.exports = router;