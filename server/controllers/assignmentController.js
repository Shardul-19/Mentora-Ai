const helpAssignment = async (req, res) => {
  try {
    const { assignment, subject, deadline } = req.body

    const prompt = `You are an expert academic assistant helping an Indian college student.
Subject: ${subject || 'General'}
Deadline: ${deadline || 'Not specified'}
Assignment: "${assignment}"
Help the student understand and complete this assignment.`

    res.json({
      success: true,
      assignment,
      subject,
      deadline,
      prompt,
      help: 'AI assignment help will appear here once API is connected'
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to process assignment' })
  }
}

module.exports = { helpAssignment }