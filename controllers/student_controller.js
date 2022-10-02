const Student = require('../models/student');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

module.exports.create = async function (req, res) {
    const { name, email, phoneNo, password, grade } = req.body
    const findStudent = await Student.findOne({ email: email })
    if (findStudent) {
        res.send({ 'status': 'failed', 'message': 'Email already exists' })
    } else {
        if (name && email && phoneNo && password && grade) {
            try {
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password, salt)
                const student = new Student({ ...req.body })
                student.password = hashPassword

                await student.save()
                const savedUser = await Student.findOne({ email: email })
                // Generating Jwt token
                const token = jwt.sign({ userID: savedUser._id }, process.env.jwt_secret_key, { expiresIn: '5d' })
                res.status(201).send({ 'status': 'success', 'message': 'Student Registerd Successfully!!', 'token': token })
            } catch (error) {
                console.log(error);
                res.send({ 'status': 'failed', 'message': 'Unable to register' })
            }
        } else {
            res.send({ 'status': 'failed', 'message': 'All fields required' })
        }
    }
}

module.exports.checkLogin = async function (req, res) {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await Student.findOne({ email: email });
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password)
                if ((user.email === email) && isMatch) {
                    // Generate login jwt token
                    const token = jwt.sign({ userID: user._id }, process.env.jwt_secret_key, { expiresIn: '5d' })
                    res.send({ 'status': 'success', 'message': 'login Success', 'token': token })
                } else {
                    res.send({ 'status': 'failed', 'message': 'Email or password does not match' })
                }
            } else {
                res.send({ 'status': 'failed', 'message': 'Not a registered Student' })
            }
        }
    }
    catch {
        console.log(error)
        res.status(500).send('Error')
    }
}

module.exports.remove = async function (req, res) {
    try {
        const updatedStudent = await Student.updateOne({ _id: req.user._id }, { $pull: { "favouriteTeachers": req.params.id } }, { returnNewDocument: true })
        res.json(updatedStudent)
    }
    catch {
        res.status(400).send('Error')
    }
}