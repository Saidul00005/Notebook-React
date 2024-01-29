import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
        const notesInitial = [
                {
                        "_id": "65ad32a2e3113b8f596c4d451",
                        "user": "65ad2e043fb22fd8b36d116a",
                        "title": "Updated title",
                        "description": "Updated description",
                        "tag": "Updated tag",
                        "date": "2024-01-21T15:05:06.191Z",
                        "__v": 0
                },
                {
                        "user": "65ad2e043fb22fd8b36d116a2",
                        "title": "Another title",
                        "description": "Another description",
                        "tag": "Another demo",
                        "_id": "65b3db12f182cda162bba41a",
                        "date": "2024-01-26T16:17:22.130Z",
                        "__v": 0
                }
        ]
        const [notes, setNotes] = useState(notesInitial)

        //Add a note
        const addNote= (title, description, tag) =>{
                //Need to do API call
               const note={
                        "_id": "65ad32a2e3113b8f596c4d451",
                        "user": "65ad2e043fb22fd8b36d116abc",
                        "title":title,
                        "description": description,
                        "tag": tag,
                        "date": "2024-01-21T15:05:06.191Z",
                        "__v": 0
                }
                setNotes(notes.concat(note))
        }

        //Delete a note
        const deleteNote= () =>{

        }

        //Edit a note
        const editNote= () =>{

        }

        return (
                <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote}}>
                        {props.children}
                </NoteContext.Provider>
        )
}


export default NoteState;