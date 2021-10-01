import React, { useState, useEffect } from 'react'
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState([null, true])

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const filteredList = persons.filter(person => {
    return person.name.includes(filter)
  })

  const sendNotification = (text, bool) => {
    setErrorMessage([text, bool])
    setTimeout(() => {
      setErrorMessage([null, true])
    }, 5000)
  }

  const alreadyDeleted = () => {
    
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const found = persons.find(person => person.name === newName);

    if (found) {
      if (window.confirm(`${found.name} is already added to phonebook, replace the old number with a new one?`)) {
        console.log(`update ${found.id}`)
        personService
          .update(found.id, personObject)
          .then(response => {

            if (response != null) {
              setPersons(persons.map(person => (person.id !== found.id) ? person : response))
              sendNotification(`Updated ${found.name}`, true)
              setNewName('')
              setNewNumber('')
            }
            else {
              sendNotification(`Information of ${found.name} has already been removed from server`, false)
              setPersons(persons.filter(person => person.id !== found.id))
            }
          }).catch(err => {
            sendNotification(`Information of ${found.name} has already been removed from server`, false)
            setPersons(persons.filter(person => person.id !== found.id))
          })
      }
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          sendNotification(`Added ${response.name}`, true)
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          sendNotification(error.response.data.error, false)
        });
    }
  }

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      console.log(`delete ${person.id}`)
      personService.deletion(person.id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== person.id))
        })
        .catch((e) => {
          sendNotification(e.response.data.error, false)
        })
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons filteredList={filteredList} deletePerson={deletePerson} />
    </div>
  )
}

export default App
