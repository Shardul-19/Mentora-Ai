const helpAssignment = async (req, res) => {
  try {
    const { assignment, subject, deadline } = req.body

    if (!assignment) {
      return res.status(400).json({ error: 'Assignment details are required' })
    }

    const prompt = `You are an expert academic assistant helping an Indian college student complete their assignment.

Subject: ${subject || 'General'}
Deadline: ${deadline || 'Not specified'}
Assignment: "${assignment}"

Help in this exact format:

UNDERSTANDING THE ASSIGNMENT:
Break down what exactly is being asked

STEP BY STEP APPROACH:
1. Step 1
2. Step 2
3. Step 3

KEY CONCEPTS TO COVER:
- Concept 1
- Concept 2
- Concept 3

SUGGESTED STRUCTURE:
Give a proper structure/outline for the assignment

IMPORTANT POINTS:
- Point 1
- Point 2

RESOURCES TO REFER:
Suggest relevant topics to study`

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