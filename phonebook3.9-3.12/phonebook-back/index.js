const express = require('express')
const app = express()
const cors = require('cors')


let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-642312"
    }
]

app.use(express.static('dist'))


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request,response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.get('/api/persons', (request, response) => {
    response.send(persons)
})

app.get('/info', (request, response) => {
    const info = `<p>Phonebook has info for ${persons.length} persons</p>
        <p>${new Date().toString()}</p>`
    response.send(info)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const findPerson = persons.find(pers => pers.id === id)
    findPerson ? response.send(findPerson) : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(pers => pers.id !== id)
    response.status(204).end()
})

const generateId = () => Math.floor(Math.random() * 10000)

app.post('/api/persons', (request, response) => {
    const body = request.body
    const id = generateId()
    const findName = persons.some(pers => pers.name === body.name)
    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'content missing' })
    }
    if (findName) {
        return response.status(400).json({ error: 'name must be unique' })
    }

    const person = {
        id: id,
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)

    response.json(person)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})