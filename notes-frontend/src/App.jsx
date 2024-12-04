import Note from './components/Note'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import {getAll,create,update} from './services/notes'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage,setErrorMessage] = useState(null)

  useEffect(() => {
      getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])


  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n=>n.id===id)
    const changedNote = {...note, important: !note.important}

    update(id,changedNote).then(returnedNote => {
      setNotes(notes.map(n=>n.id===id ? returnedNote : n))
    })
    .catch(error => {
      setErrorMessage(
        `the note '${note.content}' was already deleted from server`
      )
      setTimeout(()=>{
        setErrorMessage(null)},5000)
      })
      setNotes(notes.filter(note=>note.id !== id))
    }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note}
          toggleImportance={()=>toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
