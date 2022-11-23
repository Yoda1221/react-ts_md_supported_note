import ReactMarkdown from "react-markdown"
import { useNote } from '../container/NoteLayout'
import { Link, useNavigate } from "react-router-dom"
import { Badge, Button, Col, Row, Stack } from "react-bootstrap"

type NoteProps ={
    onDelete: (id: string) => void
}

const Note = ({ onDelete }: NoteProps) => {
    const note = useNote()
    const navigate = useNavigate()

    return (
        <>
            <Row>
                <Col className='justify-content-center mb-5'>
                    <h1>{ note.title }</h1>
                    { note.tags.length > 0 && (
                        <Stack 
                            gap={1} 
                            direction="horizontal" 
                            className="flex-wrap" 
                        >
                            { note.tags.map(tag => (
                                <Badge
                                    key={ tag.id }
                                    className="text-truncate"
                                >
                                    { tag.label }
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to={`/${note.id}/edit`} >
                            <Button variant="info">Edit</Button>
                        </Link>
                        <Button 
                            variant="outline-danger"
                            onClick={() => {
                                onDelete(note.id)
                                navigate("/")
                            }}
                        >
                            Delete
                        </Button>
                        <Link to="/" >
                            <Button variant="outline-secondary">Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{ note.md }</ReactMarkdown>
        </>
    )
}

export default Note
