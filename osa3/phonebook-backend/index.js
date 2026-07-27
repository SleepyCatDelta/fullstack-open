const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const { connectDB } = require('./utils/config')
const app = express()

connectDB()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', async (request, response) => {
  const count = await Person.countDocuments()
  response.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons', async (request, response) => {
  const persons = await Person.find({})
  response.json(persons)
})

app.get('/api/persons/:id', async (request, response, next) => {
  try {
    const person = await Person.findById(request.params.id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

app.put('/api/persons/:id', async (request, response, next) => {
  try {
    const { name, number } = request.body
    const person = await Person.findByIdAndUpdate(
      request.params.id,
      { name, number },
      { returnDocument: 'after', runValidators: true, context: 'query' }
    )
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (request, response, next) => {
  try {
    await Person.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.post('/api/persons', async (request, response, next) => {
  try {
    const { name, number } = request.body

    if (!name || !number) {
      return response.status(400).json({ error: 'name or number missing' })
    }

    const existing = await Person.findOne({ name })
    if (existing) {
      return response.status(400).json({ error: 'name must be unique' })
    }

    const person = new Person({ name, number })
    const saved = await person.save()
    response.json(saved)
  } catch (error) {
    next(error)
  }
})

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
