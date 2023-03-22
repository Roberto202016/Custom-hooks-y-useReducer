import { useState } from "react"


// Por nomenclatura todos los hooks deben de comenzar con use
const useForm = (initalState : any) => {

    const [state, setState] = useState(initalState)
    
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setState(state => ({ ...state, [e.target.name] : e.target.value}));
    }
    
    return [
        state,
        handleChange
    ];
}

export default useForm