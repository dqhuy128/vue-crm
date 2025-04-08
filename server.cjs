const express = require('express')
const cors = require('cors')
const app = express()

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Allow your frontend origin
  methods: ['GET', 'POST', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow authorization header
  credentials: true // If cookies or credentials are needed
}

app.use(cors(corsOptions))

// Example route
app.post('/api/user/login', (req, res) => {
  res.json({ message: 'Login successful' })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
