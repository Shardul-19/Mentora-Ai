const supabase = require('../services/supabaseClient')

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided. Please login first!' })
    }

    const token = authHeader.split(' ')[1]

    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
      return res.status(401).json({ error: 'Invalid or expired token. Please login again!' })
    }

    req.user = data.user
    next()

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Authentication failed' })
  }
}

module.exports = { protect }