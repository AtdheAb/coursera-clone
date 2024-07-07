const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    // _id: {
    //     type: String
    // },
    fullName: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true
    },
   
    appliedCourses: {
        type: Array

    },
    certificates:{
        type: Array
    }
}) 

module.exports = mongoose.model('students', studentSchema)