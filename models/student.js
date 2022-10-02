const mongoose = require('mongoose')
const StudentSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    favouriteTeachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        default: [null]
    }]
})

module.exports = mongoose.model('Student', StudentSchema);