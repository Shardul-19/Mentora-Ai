const OpenAI = require('openai')

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const summarizeText = async (text) => {
  const response = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `You are an expert academic assistant. Summarize the following notes in this exact structured format:

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
      }
    ]
  })

  return response.choices[0].message.content
}

module.exports = { summarizeText }