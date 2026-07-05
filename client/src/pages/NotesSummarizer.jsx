const pdfParse = require('pdf-parse')

const summarizeNotes = async (req, res) => {
  try {
    const file = req.file
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Extract text from PDF
    let extractedText = ''
    if (file.mimetype === 'application/pdf') {
      const data = await pdfParse(file.buffer)
      extractedText = data.text
    } else {
      extractedText = file.buffer.toString('utf-8')
    }

    console.log('Extracted text length:', extractedText.length)
    
    res.json({ 
      message: 'File received successfully',
      textPreview: extractedText.slice(0, 200)
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to process file' })
  }
}

module.exports = { summarizeNotes }