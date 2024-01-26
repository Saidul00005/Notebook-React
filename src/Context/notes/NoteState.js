import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
        const notesInitial = [
                {
                        "_id": "65ad32a2e3113b8f596c4d45",
                        "user": "65ad2e043fb22fd8b36d116a",
                        "title": "Updated title",
                        "description": "Updated description",
                        "tag": "Updated tag",
                        "date": "2024-01-21T15:05:06.191Z",
                        "__v": 0
                }
        ]

        const [notes, setNotes] = useState(notesInitial)
        
        return (
                <NoteContext.Provider value={{notes,setNotes}}>
                        {props.children}
                </NoteContext.Provider>
        )
}


export default NoteState;