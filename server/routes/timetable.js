const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { manageTimetable } = require('../controllers/timetableController')
const { protect } = require('../middleware/authMiddleware')
const { validate } = require('../middleware/validate')

const timetableRules = [
  body('classes').notEmpty().withMessage('Classes data is required').isArray().withMessage('Classes must be an array')
]

router.post('/', protect, timetableRules, validate, manageTimetable)

module.exports = router