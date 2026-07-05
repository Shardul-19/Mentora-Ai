const pdfParse = require('pdf-parse')
const { summarizeText } = require('../services/claudeService')

const summarizeNotes = async (req, res) => {
  try {
    const file = req.file
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    let extractedText = ''
    if (file.mimetype === 'application/pdf') {
      const data = await pdfParse(file.buffer)
      extractedText = data.text
    } else {
      extractedText = file.buffer.toString('utf-8')
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({ error: 'Could not extract text from file' })
    }

    console.log('Sending to Claude...')
    const summary = await summarizeText(extractedText)
    console.log('Summary received!')

    res.json({ 
      success: true,
      summary
    })

  } catch (error) {
    console.error('FULL ERROR:', error.message)
    console.error('ERROR STATUS:', error.status)
    res.status(500).json({ error: error.message })
  }
}

module.exports = { summarizeNotes }