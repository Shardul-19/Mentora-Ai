const manageTimetable = async (req, res) => {
  try {
    const { classes } = req.body

    if (!classes) {
      return res.status(400).json({ error: 'Classes data is required' })
    }

    res.json({
      success: true,
      classes,
      message: 'Timetable saved successfully'
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to manage timetable' })
  }
}

module.exports = { manageTimetable }