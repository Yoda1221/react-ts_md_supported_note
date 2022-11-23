import NoteForm from './NoteForm'
import { NoteData, Tag } from '../App'

type NewNoteProps = {
  availableTags: Tag[]
  onAddTag: (tag: Tag) => void
  onSubmit: (data: NoteData) => void
}

const NewNote = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
  return (
    <>
        <h1 className='mb-5'>New Note</h1>
        <NoteForm 
          onSubmit={ onSubmit } 
          onAddTag={ onAddTag } 
          availableTags={ availableTags } 
        />
    </>
  )
}

export default NewNote
