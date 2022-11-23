import { Tag } from "../App"
import ReactSelect from "react-select"
import { Link } from "react-router-dom"
import { useMemo, useState } from "react"
import styles from "../style/NoteList.module.css"
import { Badge, Button, Card, Col, Form, Modal, Row, Stack } from "react-bootstrap"

type SimpleNote = {
    id: string
    tags: Tag[]
    title: string
}

type NoteListProps = {
    availableTags: Tag[]
    notes: SimpleNote[]
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string) => void
}

type EditTagsModalProps = {
    show: boolean
    availableTags: Tag[] 
    handleClose: () => void
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string) => void
}

const NoteList = ({ availableTags, notes, onUpdateTag, onDeleteTag }: NoteListProps) => {
    const [title, setTitle] = useState("")
    const [modalShow, setModalShow] = useState(false)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])

    const filteredNotes = useMemo(() => {
        return notes.filter( note => {
            return (title === "" 
                || note.title.toLowerCase().includes(title.toLowerCase()))
            && (selectedTags.length === 0 
                || selectedTags.every( tag => note.tags.some(noteTag => noteTag.id === tag.id))
            )
        })
    }, [title, selectedTags, notes])

    return (
        <>
            <Row className="align-items-center mb-5">
                <Col><h1>Notes</h1></Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to="/new" >
                            <Button variant="info">Create</Button>
                        </Link>
                        <Button 
                            variant="outline-warning"
                            onClick={() => setModalShow(true)}
                        >
                            Edit Tags
                        </Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className="mb-5" >
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text"
                                value={ title }
                                onChange={ e => setTitle(e.target.value) }
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect 
                                isMulti 
                                value={selectedTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                options={availableTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                onChange={tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return { label: tag.label, id: tag.value}
                                    }))
                                }}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} className="g-3" >
                { filteredNotes.map(note => (
                    <Col key={note.id} >
                        <NoteCard id={ note.id } title={ note.title } tags={ note.tags } />
                    </Col>
                ))}
            </Row>
            <EditTagsModal 
                show={modalShow} 
                onUpdateTag={ onUpdateTag }
                onDeleteTag={ onDeleteTag }
                availableTags={ availableTags } 
                handleClose={() => setModalShow(false)} 
            />
        </>
    )
}

function NoteCard({id, title, tags}: SimpleNote) {
    return <Card as={ Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
        <Card.Body>
            <Stack 
                gap={2}
                className="h-100 align-items-center justify-content-center"
            >
                <span className="fs-5">{ title }</span>
                { tags.length > 0 && (
                    <Stack 
                        gap={1} 
                        direction="horizontal" 
                        className="justify-content-center flex-wrap" 
                    >
                        { tags.map(tag => (
                            <Badge
                                key={ tag.id }
                                className="text-truncate"
                            >
                                { tag.label }
                            </Badge>
                        ))}
                    </Stack>
                )}
            </Stack>
        </Card.Body>
    </Card>
}

function EditTagsModal({ 
    show, 
    handleClose,
    onUpdateTag, 
    onDeleteTag, 
    availableTags 
}: EditTagsModalProps) {
    return <Modal show={ show } onHide={ handleClose } >
        <Modal.Header closeButton >
            <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Stack gap={3} >
                    {availableTags.map(tag => (
                        <Row key={ tag.id }>
                            <Col>
                                <Form.Control 
                                    type="text" 
                                    value={ tag.label } 
                                    onChange={ e => onUpdateTag(tag.id, e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Button 
                                    variant="outline-danger"
                                    onClick={() => onDeleteTag(tag.id) }
                                >
                                    &times;
                                </Button>
                            </Col>
                        </Row>
                    ))}
                </Stack>
            </Form>
        </Modal.Body>
    </Modal>
}

export default NoteList