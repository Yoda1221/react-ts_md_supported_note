import NoteForm from './NoteForm'
import { NoteData, Tag } from '../App'
import { useNote } from '../container/NoteLayout'

type EditNoteProps = {
    onAddTag: (tag: Tag) => void
    onSubmit: (id: string, data: NoteData) => void
    availableTags: Tag[]
}

const EditNote = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
    const note = useNote()

    return (
        <>
            <h1 className='mb-5'>EditNote</h1>
            <NoteForm 
                title={ note.title }
                md={ note.md }
                tags={ note.tags }
                onSubmit={ data => onSubmit(note.id, data) } 
                onAddTag={ onAddTag } 
                availableTags={ availableTags } 
            />
        </>
    )
}

export default EditNote
