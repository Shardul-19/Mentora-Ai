const helpAssignment = async (req, res) => {
  try {
    const { assignment, subject, deadline } = req.body

    if (!assignment) {
      return res.status(400).json({ error: 'Assignment details are required' })
    }

    // AI integration will go here later
    res.json({
      success: true,
      assignment,
      subject,
      deadline,
      help: 'AI assignment help will appear here once API is connected'
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to process assignment' })
  }
}

module.exports = { helpAssignment }
