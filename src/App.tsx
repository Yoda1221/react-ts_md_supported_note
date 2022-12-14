import { useMemo } from "react"
import { v4 as uuidV4 } from "uuid"
import { Container } from "react-bootstrap"
import NoteLayout from "./container/NoteLayout"
import { useLocalStorege } from "./hooks/useLocalStorege"
import { Navigate, Routes, Route } from "react-router-dom"
import { EditNote, NewNote, Note, NoteList } from "./components"

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  md: string
  tagIds: string[]
}

export type NoteData = {
  title: string
  md: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [ tags, setTags ]   = useLocalStorege<Tag[]>("TAGS", [])
  const [ notes, setNotes ] = useLocalStorege<RawNote[]>("NOTES", [])

  const notesWithTags = useMemo(() => {
    return notes.map( note => {
      return { ...note, tags: tags.filter( tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  function onCreateNote({tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return [ ...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)}]
    })
  }

  function updateNote(id: string, {tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map( note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id)}
        } else {
          return note
        }
      })
    })
  }

  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id != id)
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [ ...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }
  
  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id != id)
    })
  }

  return (
    <Container className="my-5">
      <Routes>
        <Route path="/" 
          element={ <NoteList 
              notes={ notesWithTags } 
              availableTags={ tags } 
              onUpdateTag={ updateTag }
              onDeleteTag={ deleteTag }
          /> } 
        />
        <Route 
          path="/new" 
          element={ 
            <NewNote 
              onSubmit={ onCreateNote } 
              onAddTag={ addTag } 
              availableTags={ tags }
            /> 
          } 
        />
        <Route path="/:id" element={ <NoteLayout notes={ notesWithTags } /> }>
          <Route index element={ <Note onDelete={ onDeleteNote }/> } />
          <Route path="edit" element={ <EditNote
                onSubmit={ updateNote } 
                onAddTag={ addTag } 
                availableTags={ tags } 
              /> 
            } 
          />
        </Route>
        <Route path="*" element={ <Navigate to="/" /> } /> {/* OR 404 page */}
      </Routes>
    </Container>
  )
}

export default App
