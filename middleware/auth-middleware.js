const jwt = require('jsonwebtoken');
const Student = require('../models/student');

module.exports = async function checkStudentAuth(req, res, next) {
    let token
    const { authorization } = req.headers
    console.log('-----', authorization)
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // get token from header
            token = authorization.split(' ')[1]
            //verify token
            const { userID } = jwt.verify(token, process.env.jwt_secret_key)
            console.log(userID)
            //get user from token
            req.user = await Student.findById(userID).select('-password')
            console.log('********', req.user)
            next()
        } catch (error) {
            console.log(error)
            res.status(401).send({ 'status': 'failed', 'message': 'Unauthorized User' })
        }
    }
    if (!token) {
        res.status(401).send({ 'status': 'failed', 'message': 'Unauthorized User, token not found ' })
    }
}