const pdfParse = require('pdf-parse')
const { summarizeText } = require('../services/claudeService')
const supabase = require('../services/supabaseClient')

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

    console.log('Sending to AI...')
    const summary = await summarizeText(extractedText)
    console.log('Summary received!')

    // Save to Supabase
    const { error: dbError } = await supabase
      .from('summaries')
      .insert({
        user_id: req.user.id,
        file_name: file.originalname,
        summary: summary
      })

    if (dbError) {
      console.error('DB Error:', dbError)
    }

    res.json({ 
      success: true,
      summary
    })

  } catch (error) {
    console.error('FULL ERROR:', error.message)
    res.status(500).json({ error: error.message })
  }
}

module.exports = { summarizeNotes }