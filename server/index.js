require('dotenv').config()

const express = require('express')
const cors = require('cors')

const summarizerRoute = require('./routes/summarizer')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Mentora AI Backend Running!')
})

app.use('/api/summarize', summarizerRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}).on('error', (err) => {
  console.error('Server error:', err)
})