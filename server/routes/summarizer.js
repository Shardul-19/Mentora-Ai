const express = require('express')
const router = express.Router()
const { summarizeNotes } = require('../controllers/summarizerController')
const upload = require('../middleware/upload')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, upload.single('file'), summarizeNotes)

module.exports = router