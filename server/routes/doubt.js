const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { solveDoubt } = require('../controllers/doubtController')
const { protect } = require('../middleware/authMiddleware')
const { validate } = require('../middleware/validate')

const doubtRules = [
  body('question').notEmpty().withMessage('Question is required').isLength({ min: 10 }).withMessage('Question must be at least 10 characters'),
  body('subject').notEmpty().withMessage('Subject is required')
]

router.post('/', protect, doubtRules, validate, solveDoubt)

module.exports = router