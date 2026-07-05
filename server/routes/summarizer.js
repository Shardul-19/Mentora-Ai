const express = require('express')
const router = express.Router()
const { summarizeNotes } = require('../controllers/summarizerController')
const upload = require('../middleware/upload')

router.post('/', upload.single('file'), summarizeNotes)

module.exports = router