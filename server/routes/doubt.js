const express = require('express')
const router = express.Router()
const { solveDoubt } = require('../controllers/doubtController')

router.post('/', solveDoubt)

module.exports = router