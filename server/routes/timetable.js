const express = require('express')
const router = express.Router()
const { manageTimetable } = require('../controllers/timetableController')

router.post('/', manageTimetable)

module.exports = router
