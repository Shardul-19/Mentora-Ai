const supabase = require('../services/supabaseClient')

const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email and password are required' })
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    })

    if (error) return res.status(400).json({ error: error.message })

    res.json({
      success: true,
      message: 'Account created successfully!',
      user: data.user
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Signup failed' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) return res.status(400).json({ error: error.message })

    res.json({
      success: true,
      message: 'Logged in successfully!',
      session: data.session,
      user: data.user
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Login failed' })
  }
}

const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) return res.status(400).json({ error: error.message })
    res.json({ success: true, message: 'Logged out successfully!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Logout failed' })
  }
}

module.exports = { signup, login, logout }