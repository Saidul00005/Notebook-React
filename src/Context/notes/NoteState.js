import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
        const host = "http://localhost:5000"
        const notesInitial = []
        const [notes, setNotes] = useState(notesInitial)

        //Get all notes
        const getNotes = async () => {
                //API call
                const response = await fetch(`${host}/api/notes/getallnotes`, {
                        method: "GET",
                        headers: {
                                "Content-Type": "application/json",
                                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZDJlMDQzZmIyMmZkOGIzNmQxMTZhIn0sImlhdCI6MTcwNTg0ODMzNH0.x0StwxR4N2wKdRQT5EBjPXPJYIr-Ek-a1bxkZi6fTaw"

                        }

                });
                const json = await response.json()
                setNotes(json)
        }

        //Add a note
        const addNote = async (title, description, tag) => {
                //API call
                // eslint-disable-next-line
                const response = await fetch(`${host}/api/notes/addnote`, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZDJlMDQzZmIyMmZkOGIzNmQxMTZhIn0sImlhdCI6MTcwNTg0ODMzNH0.x0StwxR4N2wKdRQT5EBjPXPJYIr-Ek-a1bxkZi6fTaw"

                        },
                        body: JSON.stringify({ title, description, tag })
                });

                //Logic to add note in client
                const note = {
                        "_id": "65ad32a2e3113b8f596c4d451",
                        "user": "65ad2e043fb22fd8b36d116abc",
                        "title": title,
                        "description": description,
                        "tag": tag,
                        "date": "2024-01-21T15:05:06.191Z",
                        "__v": 0
                }
                setNotes(notes.concat(note))
        }

        //Delete a note
        const deleteNote = async (id) => {
                //API call
                const response = await fetch(`${host}/api/notes//deletenote/${id}`, {
                        method: "DELETE",
                        headers: {
                                "Content-Type": "application/json",
                                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZDJlMDQzZmIyMmZkOGIzNmQxMTZhIn0sImlhdCI6MTcwNTg0ODMzNH0.x0StwxR4N2wKdRQT5EBjPXPJYIr-Ek-a1bxkZi6fTaw"

                        },
                       
                });

                const newNotes = notes.filter((note) => { return note._id!==id })
                setNotes(newNotes)
        }

        //Edit a note
        const editNote = async (id, title, description, tag) => {
                //API call
                // eslint-disable-next-line
                const response = await fetch(`${host}/api/notes//updatenote/${id}`, {
                        method: "PUT",
                        headers: {
                                "Content-Type": "application/json",
                                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZDJlMDQzZmIyMmZkOGIzNmQxMTZhIn0sImlhdCI6MTcwNTg0ODMzNH0.x0StwxR4N2wKdRQT5EBjPXPJYIr-Ek-a1bxkZi6fTaw"

                        },
                        body: JSON.stringify({ title, description, tag })
                });

                let newNotes = JSON.parse(JSON.stringify(notes))

                //Logic to edit note in client
                for (let index = 0; index < newNotes.length; index++) {
                        const element = newNotes[index];
                        if (element._id === id) {
                                newNotes[index].title = title;
                                newNotes[index].description = description;
                                newNotes[index].tag = tag;
                        
                        break;

                        }
                        
                }
                setNotes(newNotes);
        }

        return (
                <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
                        {props.children}
                </NoteContext.Provider>
        )
}


export default NoteState;