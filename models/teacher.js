const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: Number,
        required: true,
        unique: true
    },
    subject: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Teacher', TeacherSchema);