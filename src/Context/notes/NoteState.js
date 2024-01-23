import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState =(props) =>{
        const s1={
                "name": "Aname",
                "class": "Aclass"
        }

        const [state, setstate] = useState(s1)
        const update =() =>{
                setTimeout(() => {
                        setstate(
                                {
                                        "name":"AnotherName",
                                        "class":"AnotherClass"
                                }
                        )
                }, 1000);
        }
        return(
                <NoteContext.Provider value={{state:state,update:update}}>
                        {props.children}
                </NoteContext.Provider>
        )
}


export default NoteState ;