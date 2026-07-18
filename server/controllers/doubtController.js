const solveDoubt = async (req, res) => {
  try {
    const { question, subject } = req.body

    if (!question) {
      return res.status(400).json({ error: 'Question is required' })
    }

    // AI integration will go here later
    res.json({
      success: true,
      question,
      subject,
      answer: 'AI answer will appear here once API is connected'
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to process question' })
  }
}

module.exports = { solveDoubt }