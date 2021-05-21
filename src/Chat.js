import { IconButton } from '@material-ui/core'
import { AttachFile, EmojiEmotions, InsertEmoticon, Mic, MoreVert, Search, Send } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import './chat.css'
import db from './firebase'
import { useParams } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import firebase from 'firebase'
import Avatar from 'react-avatar';


const Chat = (props) => {

    const [{user},dispatch] = useStateValue()
    const { roomId } = useParams()
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])


    useEffect(() => {
        if (roomId) {

            db.collection("rooms").doc(roomId).onSnapshot((snap) => {
                setName(() => {
                    return snap.data().name
                })
            })

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snap) => (
                setMessages(snap.docs.map((doc) => (
                    doc.data()
                )))
            ))
        }

    }, [roomId])
    console.log(messages);
    const [input, setInput] = useState('')

    const send = (e) => {
        e.preventDefault()
        const time = new Date().toLocaleTimeString()

        
        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('')
    }

    const something=(event)=> {
        if(event.keyCode === 13){
            event.preventDefault()
            db.collection('rooms').doc(roomId).collection('messages').add({
                message:input,
                name:user.displayName,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            })
            setInput('')
        }
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar name={name} size="42" textSizeRatio={1.75} round={true}  />
                <div className="chatheader__info">
                    <h3>{name}</h3>
                    <p>Last Seen at {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toLocaleTimeString()}</p>

                </div>

                <div className="chatheader__right">
                    <IconButton>
                        <Search />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {
                    messages.map((val) => (

                        <p className={`chat__message ${val.name ===user.displayName && 'chat__messageReceiver'}`}>
                            <span className="chat__name">
                                {val.name}
                            </span>
                            <span className="chat__msgbody">

                                {val.message}
                                <span className="chat__time">
                                    {new Date(val.timestamp?.toDate()).toLocaleTimeString()}
                                </span>
                            </span>
                        </p>
                    ))
                }

            </div>

            <div className="chat__footer">
                <IconButton>
                <InsertEmoticon></InsertEmoticon>
                </IconButton>
                <form action="">
                    <input type="text" placeholder="Enter the message" onKeyDown={something} value={input} onChange={(e) => { setInput(e.target.value) }} />
                    <IconButton onClick={send} onKeyDown={send} >
                        <Send></Send>
                    </IconButton>
                </form>
                <IconButton>
                    <Mic></Mic>
                </IconButton>
            </div>
        </div>


    )
}

export default Chat
