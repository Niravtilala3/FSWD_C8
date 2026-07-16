const Student = require('../models/student');

const studentCtl = {};

// GET /students
studentCtl.studentRootFun = async (req, res, next) => {
    const students = await Student.find();
    res.render('students/index', { title: 'Students', students });
}

// GET create new student form
studentCtl.studentNewForm = (req, res) => {
  res.render('students/new', { title: 'Create Student' });
}

// POST create new student
studentCtl.studentCreate = async (req, res, next) => {
    const student = await Student.create({
      name: req.body.name,
      rollNumber: req.body.rollNumber,
      address: req.body.address,
    });
    // res.send('Student created successfully');
    res.redirect(`/students`);
}

// GET individual student
studentCtl.studentView = async (req, res, next) => {
    const student = await Student.findById(req.params.studentId);
    const title = 'Student Details';
    if (!student) {
      return res.status(404).render('404', { title: 'Student Not Found' });
    }
    //res.send(student);
    res.render('students/show', { title, student });
}

// GET edit student form
studentCtl.studentEditForm =  async (req, res, next) => {
    const student = await Student.findById(req.params.studentId);
    const title = 'Edit Student';
    if (!student) {
      return res.status(404).render('404', { title: 'Student Not Found' });
    }
    res.render('students/edit', { title, student });
}

// POST update student
studentCtl.studentEdit = async (req, res) => {
    await Student.findByIdAndUpdate(
      req.params.studentId,
      {
        name: req.body.name,
        rollNumber: req.body.rollNumber,
        address: req.body.address
      }
    );
    res.redirect('/students')
}

// POST delete student
studentCtl.studentDelete =  async (req, res) => {
    await Student.findByIdAndDelete(req.params.studentId);
    res.redirect('/students');
}

module.exports = studentCtl;