import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

const Main = ({ activeNote, onUpdateNote }) => {
    const onEditNote = (key, value) => {
        onUpdateNote({
            ...activeNote,
            [key]: value,
            lastModified: Date.now(),
        })
    }

if (!activeNote) return <div className='no-active-note'>No note selected</div>

    return (
        <div className='app-main'>
            <div className='app-main-note-edit'>
                <input type='text' id='title' value={activeNote.title} onChange={(e) => onEditNote("title", e.target.value)} autoFocus />
                <textarea id='body' placeholder='write your note here....' value={activeNote.body} onChange={(e) => onEditNote("body", e.target.value)}  ></textarea>

            </div>

            <div className='app-main-note-preview'>
                <h1 className='preview-title'>{activeNote.title}</h1>
                <ReactMarkdown className='markdown-preview'>{activeNote.body}</ReactMarkdown>



            </div>
        </div>

    )
}

export default Main