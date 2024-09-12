import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/personform'
import Persons from './components/persons'
import { getAll } from './services/persons'
import Notification from './components/notification'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 12345 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [pers, setPers] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    getAll()
    .then(initialPersons => {
        setPersons(initialPersons)
    })
  },[])
  const handleNameAdd = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberAdd = e => setNewNumber(e.target.value)


  const handlePers = e => {
    setPers(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter persons={persons} pers={pers} handlePers={handlePers} setPers={setPers} />
      <h3>add a new</h3>
      <PersonForm message={message} setMessage={setMessage} persons={persons} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} setPersons={setPersons} handleNameAdd={handleNameAdd} handleNumberAdd={handleNumberAdd} />
      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App