const express = require('express')
const router = express.Router()
const { solveDoubt } = require('../controllers/doubtController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, solveDoubt)

module.exports = router