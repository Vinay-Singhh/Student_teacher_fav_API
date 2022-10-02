const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/student_controller');
const teachersController = require('../controllers/teacher_controller');
const verify = require('../middleware/auth-middleware')

router.post('/register', studentsController.create);

router.post('/login', studentsController.checkLogin);

router.post('/add', verify, teachersController.add);

router.delete('/remove/:id', verify , studentsController.remove)

router.get('/favourite', verify, teachersController.fav)

module.exports = router;