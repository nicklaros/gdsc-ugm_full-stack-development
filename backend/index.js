import express from 'express'
import cors from "cors"

// Instantiate express app.
const app = express()

// Make our app can parse json in request body.
app.use(express.json())

// Allow cors.
app.use(cors())

// For the sake of simplicity, for now we will use in memory variable to store our todos.
const todos = {}

// Endpoint for listing todos.
app.get('/list', (req, res) => {
  res.json({
    todos,
  })
})

// Endpoint for adding new todo.
app.post('/add', (req, res) => {
  todos[req.body.name] = req.body.completed

  res.json({
    error: null,
  })
})

// Endpoint for toggling todo.
app.post('/toggle', (req, res) => {
  const completed = todos[req.body.name]

  todos[req.body.name] = !completed

  res.json({
    error: null,
  })
})

// Port for exposing our app.
const port = 3001

// Listen on exposed port.
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})