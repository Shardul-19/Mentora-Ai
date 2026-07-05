const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI('AQ.Ab8RN6KfY1ihOVAsK80KOPnCrBqJ79SzVlbeJvfck6rtFuxHUA')

const summarizeText = async (text) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const prompt = `You are an expert academic assistant. Summarize the following notes in this exact structured format:

KEY TOPICS:
- List main topics covered

SHORT SUMMARY:
2-3 sentences overview

IMPORTANT FORMULAS:
- List any formulas or equations (write NONE if no formulas)

KEY TAKEAWAYS:
- List 3-5 most important points

FULL SUMMARY:
Detailed paragraph summary

Here are the notes to summarize:
${text}`

  const result = await model.generateContent(prompt)
  return result.response.text()
}

module.exports = { summarizeText }