const express = require('express');
const router = express.Router()
const { signinUser, loginUser, forgetPassword, resetPassword} = require('../controllers/userController')

// // get user
router.post('/login', loginUser)


// //new user
router.post('/signup', signinUser)

// //forgetPassword
router.post('/forget-password', forgetPassword)

// //resetPassword
router.get('/reset-password/:id/:token', resetPassword)

// //change Password
router.post('/reset-password/:id/:token', resetPassword)


module.exports = router