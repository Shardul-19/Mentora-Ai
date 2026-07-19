require('dotenv').config()
const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const summarizerRoute = require('./routes/summarizer')
const doubtRoute = require('./routes/doubt')
const assignmentRoute = require('./routes/assignment')
const timetableRoute = require('./routes/timetable')
const authRoute = require('./routes/auth')

const app = express()

// Rate limiters
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again after 15 minutes!' }
})

const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { error: 'Too many AI requests, please slow down!' }
})

const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: { error: 'Too many login attempts, please try again after 1 minute!' }
})

app.use(cors())
app.use(express.json())
app.use(globalLimiter)

app.get('/', (req, res) => {
  res.send('Mentora AI Backend Running!')
})

app.use('/api/auth', authLimiter, authRoute)
app.use('/api/summarize', aiLimiter, summarizerRoute)
app.use('/api/doubt', aiLimiter, doubtRoute)
app.use('/api/assignment', aiLimiter, assignmentRoute)
app.use('/api/timetable', aiLimiter, timetableRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}).on('error', (err) => {
  console.error('Server error:', err)
})