const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { helpAssignment } = require('../controllers/assignmentController')
const { protect } = require('../middleware/authMiddleware')
const { validate } = require('../middleware/validate')

const assignmentRules = [
  body('assignment').notEmpty().withMessage('Assignment details are required').isLength({ min: 10 }).withMessage('Please provide more details about your assignment'),
  body('subject').notEmpty().withMessage('Subject is required')
]

router.post('/', protect, assignmentRules, validate, helpAssignment)

module.exports = router  