import { v4 as uuidV4 } from "uuid"
import { NoteData, Tag } from "../App"
import { FormEvent, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"

type NoteFromProps = {
    onAddTag: (tag: Tag) => void
    onSubmit: (data: NoteData) => void
    availableTags: Tag[]
} & Partial<NoteData>

const NoteForm = ({ onSubmit, onAddTag, availableTags, title = "", md = "", tags = [] }: NoteFromProps) => {
    const navigate = useNavigate()
    const titleRef = useRef<HTMLInputElement>(null)
    const mdRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit({
            title: titleRef.current!.value,
            md: mdRef.current!.value,
            tags: selectedTags
        })
        navigate("/")
    }

    return (
        <Form onSubmit={ handleSubmit }>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                required 
                                ref={titleRef} 
                                defaultValue={ title } 
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect 
                                isMulti 
                                onCreateOption={ label => {
                                    const newTag = { id: uuidV4(), label}
                                    onAddTag(newTag)
                                    setSelectedTags(prev => [ ...prev, newTag ])
                                }}
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
                <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control 
                        rows={15} 
                        required 
                        ref={mdRef} 
                        as="textarea" 
                        defaultValue={ md } 
                    />
                </Form.Group>
                <Stack 
                    gap={3}
                    direction="horizontal" 
                    className="justify-content-end"
                >
                    <Button 
                        size="sm"
                        type="submit"
                        variant="info"
                    >
                        Save
                    </Button>
                    <Link to="..">
                        <Button 
                            size="sm"
                            type="button"
                            variant="outline-secondary"
                        >
                            Cancel
                        </Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )
}

export default NoteForm
