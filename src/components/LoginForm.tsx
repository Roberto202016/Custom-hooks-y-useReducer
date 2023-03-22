//@ts-nocheck
import React, { FormEvent, useReducer, useState } from "react";
import useForm from './useForm.tsx'
import './style.css'

type AuthAction = 
| { type: 'logout'}
| { type: 'login', payload : loginForm };



interface AuthState {
    logged : Boolean,
    userName: string,
    password: string,
    
}

const AuthInitialState : AuthState = {
    logged: false,
    userName: '',
    password: '',
}



const authReducer = (state : AuthState, action : AuthAction) : AuthState => {
    switch(action.type) {
        case 'logout':
            console.log(state.logged)
            return {
                ...AuthInitialState,
            }

        case 'login':
            const {userName, password} = action.payload
            console.log(state.logged)
            return {
                userName, 
                password,
                logged : true,             
            };

        default:
            return console.error(
                'popo'
            );
            ;
    }
}
   



function LoginForm() {

    const [state, dispatch] = useReducer(authReducer, AuthInitialState);
    const [{userName, password}, handleChange] = useForm(AuthInitialState);


    const [failed, setFailed] = useState(false)
    const logout = () => {
        setFailed(false)
        dispatch({type : 'logout'})
    }

    const login = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (userName === 'admin' && password === '12345'){
            setFailed(false)
            dispatch({type: 'login', payload : {userName: userName, password: password}})
        }
        else{
            setFailed(true)

        }
        
    }

        return (

            <div className="inputs">
            <form onSubmit={login}>
                <label htmlFor=""> Username: </label>
                <input 
                type="text" 
                name="userName" 
                value={userName }
                onChange={handleChange} 
                className='text'/>
                <br />
                <label htmlFor=""> Password:  </label>
                <input
                className='text'
                type="text" 
                name="password" 
                value={password} 
                onChange={handleChange}/>
                <br />
                <input type="submit" value='login' className="button" />
                <br />
                
                {failed && <h4>Error: Credentials not correct</h4>}
                {state.logged===true && <h4> Welcome:  {userName} </h4>}
                
            </form>

            <button
            onClick={logout}
            className='button'> 
            Logout
            </button>

            </div>
        );
}

export default LoginForm