const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { signup, login, logout } = require('../controllers/authController')
const { validate } = require('../middleware/validate')

const signupRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
]

const loginRules = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
]

router.post('/signup', signupRules, validate, signup)
router.post('/login', loginRules, validate, login)
router.post('/logout', logout)

module.exports = router