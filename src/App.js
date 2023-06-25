import React, { useEffect } from 'react'
import uuid from 'react-uuid'
import './App.css'
import Sidebar from './Sidebar'
import Main from './Main'
import {useState,useRef} from 'react'

const App = () => {
  let localRef = useRef()
  if(localStorage.notes!==undefined){
     localRef.current = JSON.parse(localStorage.getItem("notes"))
  }
  else{
     localRef.current = []
  }
    const [notes,setNotes]= useState(localRef.current|| [] )
    const [activeNote,setActiveNote] = useState(false)

    useEffect(()=>{
        localStorage.setItem("notes",JSON.stringify(notes))
    },[notes])

    const handleAddNote = ()=>{
      const newNote = {
        id:uuid(),
        title:"Untitled Note",
        body:"",
        lastModified:Date.now(),
      };
      setNotes([newNote,...notes])
    }

    const onUpdateNote =(updatedNote)=>{
        const updatedNotesArray = notes.map((note)=>{
            if(note.id===activeNote){
                return updatedNote
            }

            return note;
        });
        setNotes(updatedNotesArray)

    }





    const handleDeleteNote=(idToDelete)=>{
        setNotes(notes.filter(note=>note.id!==idToDelete))

    };


    const getActiveNote = ()=>{
        return notes.find(note=>note.id===activeNote)
    }
    
  return (

    <div className='App'>

<Sidebar notes={notes} handleAddNote={handleAddNote}  handleDeleteNote={handleDeleteNote} 
   activeNote={activeNote}
   setActiveNote={setActiveNote} />

<Main   activeNote={getActiveNote()}  onUpdateNote={onUpdateNote}           />

    </div>
  )
}

export default App