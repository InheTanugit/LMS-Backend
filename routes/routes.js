const express = require('express')
const { userRegistration,userLogin, getUsers } = require('../controller/authController')
const { checkAuth } = require('../constants/auth')
var passport = require('passport')
const { isAuthenticated } = require('../passportConfig ')
const { createCourse, getCourses, updateCourse } = require('../controller/courseController')

const router = express.Router()

router.post('/registerUser',userRegistration)

router.post('/userLogin', passport.authenticate('local'),userLogin);

router.get('/getUsers',isAuthenticated, getUsers)

router.post('/createCourse',isAuthenticated, createCourse)

router.put('/updateCourse/:course_id',isAuthenticated, updateCourse)

router.get('/getCourse/:teacher_id',isAuthenticated, getCourses)

module.exports = router