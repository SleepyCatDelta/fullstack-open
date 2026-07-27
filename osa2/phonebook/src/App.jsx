import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const notifySuccess = (message) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(null), 5000)
  }

  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existing = persons.find(person => person.name === newName)
    if (existing) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...existing, number: newNumber }
        personService
          .update(existing.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existing.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            notifySuccess(`Changed ${returnedPerson.name}'s number`)
          })
          .catch(() => {
            notifyError(`Information of ${existing.name} has already been removed from server`)
            setPersons(persons.filter(p => p.id !== existing.id))
          })
      }
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        notifySuccess(`Added ${returnedPerson.name}`)
      })
      .catch(() => {
        notifyError(`Failed to add ${newName}`)
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          notifySuccess(`Deleted ${person.name}`)
        })
        .catch(() => {
          notifyError(`Failed to delete ${person.name}`)
        })
    }
  }

  const personsToShow = filter
    ? persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        numberValue={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={deletePerson} />
    </div>
  )
}

export default App
