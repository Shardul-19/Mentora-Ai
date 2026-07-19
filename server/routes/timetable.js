const express = require('express')
const router = express.Router()
const { manageTimetable } = require('../controllers/timetableController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, manageTimetable)

module.exports = router