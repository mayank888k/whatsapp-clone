import './login.css'
import logo from './whatsapp.png'

import React from 'react'
import { Button } from '@material-ui/core'
import { auth, provider } from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

const Login = () => {

    const [{}, dispatch] = useStateValue();
    const signin = ()=>{
        auth.signInWithPopup(provider).then((result)=>{
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div>
            <div className="login__container">
            <div className="login__details">

                <img src={logo}/>
                <h1>Sign In to the WhatsApp</h1>
                <Button onClick={signin}  style={{color:"green"}} >Sign In</Button>
            
            </div>
            </div>
        </div>
    )
}

export default Login
