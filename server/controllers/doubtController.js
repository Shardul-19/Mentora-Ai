const supabase = require('../services/supabaseClient')

const solveDoubt = async (req, res) => {
  try {
    const { question, subject } = req.body

    const prompt = `You are an expert ${subject || 'academic'} tutor helping an Indian college student understand concepts clearly.

The student asks: "${question}"

Answer in this exact format:

SIMPLE EXPLANATION:
Explain in simple, easy to understand language (2-3 sentences)

DETAILED ANSWER:
Give a thorough explanation with examples

KEY POINTS TO REMEMBER:
- Point 1
- Point 2
- Point 3

EXAMPLE:
Give a real world or practical example

PRO TIP:
One important tip to remember this concept forever`

    // Save to Supabase
    const { error: dbError } = await supabase
      .from('doubts')
      .insert({
        user_id: req.user.id,
        question,
        subject,
        answer: 'AI answer will appear here once API is connected'
      })

    if (dbError) {
      console.error('DB Error:', dbError)
    }

    res.json({
      success: true,
      question,
      subject,
      prompt,
      answer: 'AI answer will appear here once API is connected'
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to process question' })
  }
}

module.exports = { solveDoubt }