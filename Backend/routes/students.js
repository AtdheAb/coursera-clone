const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const studentModel = require('../models/student')

//get all students
router.get('/' , async (req,res) =>{
   try{
    const students = await studentModel.find()
    res.json(students)
    // res.render('students.ejs', {students})

   }catch(err){
    res.status(500).json({message: err.message})
   }
})
router.get('/update' , async (req, res) => {
    var id = new mongoose.Types.ObjectId(req.query.id)

    var std = await studentModel.findById(id).exec().then(
        (student) =>{
            if(!student){
                res.json({message:"could not find the user..."})
            }
            res.render('update.ejs', {student})
        }
    )   
})

router.get('/add' , (req, res) => {
    res.render('addStudent.ejs')
})
//get one specific student
router.get('/:id' , async (req,res) =>{
   var id = new mongoose.Types.ObjectId(req.params.id)
   let std
   try{
    std = await studentModel.findById(id).exec()
    if(std == null){
        res.json({message: "Could not find the student..."})
    }
   }catch(err){
    res.status(500).json({message: err.message})
   }
   res.json(std)
})
//detele one student
router.delete('/:id' , async (req,res) =>{
    var id = new mongoose.Types.ObjectId(req.params.id)
    try{
        var std  = await studentModel.findByIdAndDelete(id)
        if(!std){
            res.json({message: "Student not found..."})
        }
        res.status(200).json({message: 'Succesfully deleted user'})

    }catch(err){
        res.status(500).json({message: err.message})
    }
})
//create one student
// router.post('/add' , async (req, res) => {
//     const std = new studentModel({
//         fullName: req.fullName,
//         email: req.email,       
//     })
//     try{
//         const newStudent = await std.save()
//         // res.redirect('/students');
//         console.log('ok from server')
//     }catch(err){
//         res.status(400).json({message: err.message})
//     }
// })
router.post('/add', async (req, res) => {
    const { fullName, email } = req.body;
  
    const std = new studentModel({
      fullName,
      email,
    });  
    try {
      const newStudent = await std.save();
      console.log('ok from server');
      res.status(201).json(newStudent);  // Sending the newly created student as a response
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
router.post('/update' , async (req, res) => {
    try {    
        const id = req.body.id; 
        const updatedData = {
          fullName: req.body.fullName,
          email: req.body.email,
        };
        const student = await studentModel.findByIdAndUpdate(id, updatedData, { new: true }); 
        //console.log(student)   
        if (!student) {
          return res.status(404).json({ message: "Student not found..." });
        }   
        res.redirect('/students');
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
})

//update one student
router.patch('/:id' , async (req,res) =>{
    var id = new mongoose.Types.ObjectId(req.params.id)
    const { fullName } = req.body
    try{
        var student = await studentModel.findById(id).exec()
        if(!student){
            res.status(404).json({message: "Student not found..."})
        }
        student.fullName = fullName
        var updatedStudent = await student.save()
        res.json(updatedStudent)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})


module.exports = router;




