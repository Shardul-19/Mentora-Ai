const manageTimetable = async (req, res) => {
  try {
    const { classes } = req.body

    if (!classes) {
      return res.status(400).json({ error: 'Classes data is required' })
    }

    const prompt = `You are an expert academic planner helping an Indian college student organize their timetable.

Here are the student's classes:
${JSON.stringify(classes, null, 2)}

Analyze and suggest in this exact format:

TIMETABLE ANALYSIS:
Brief analysis of the student's schedule

STUDY TIME SUGGESTIONS:
- Subject 1: Best time to study
- Subject 2: Best time to study

PRODUCTIVITY TIPS:
- Tip 1
- Tip 2
- Tip 3

WEEKLY STUDY PLAN:
Monday: 
Tuesday:
Wednesday:
Thursday:
Friday:
Saturday:
Sunday:

IMPORTANT REMINDERS:
- Reminder 1
- Reminder 2`

    res.json({
      success: true,
      classes,
      prompt,
      message: 'Timetable saved successfully'
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to manage timetable' })
  }
}

module.exports = { manageTimetable }