const express = require('express')
const router = express.Router()
const { helpAssignment } = require('../controllers/assignmentController')

router.post('/', helpAssignment)

module.exports = router