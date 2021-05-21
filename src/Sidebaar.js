import React, { useEffect, useState } from 'react'
import './sidebaar.css'
import ChatIcon from '@material-ui/icons/Chat';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { Add } from '@material-ui/icons';
import { useStateValue } from './StateProvider';

const Sidebaar = () => {

    const [{user},dispatch] = useStateValue()
    const [rooms,setRooms] = useState([])

    useEffect(() => {
        
        db.collection('rooms').onSnapshot((snap)=>{
            setRooms(
                snap.docs.map((val)=>{
                    return ({
                        id:val.id,
                        data:val.data()
                    })
                })
            )
        })

        return () => {
            
        }
    }, [])

    const addnewchat = (e) =>{
        e.preventDefault()
        const chatname = prompt("Enter Name")
        if(chatname)
        {
            db.collection('rooms').add({
                name:chatname
            })
        }
    }

    return (
        <div className="sidebaar">
            <div className="sidebaar__header">
            <Avatar src={user?.photoURL} />
            <h3>WhatsApp</h3>
                <div className="sidebaar__headerRight">
                <IconButton>
                    <DonutLargeIcon fontSize='small' />
                </IconButton>
                <IconButton>
                    <ChatIcon fontSize='small' />
                </IconButton>
                <IconButton>
                    <MoreVertIcon fontSize='small' />
                </IconButton>
                </div>
            </div>
            <div className="sidebar__searchbar">
                <div className="searchbar__container">
                    <IconButton style={{padding:"5px", marginLeft:"5px"}}>
                        <SearchIcon fontSize ='small' />
                    </IconButton>
                    <input type="text" placeholder="Search"/>
                    <IconButton onClick={addnewchat} style={{padding:"5px", marginLeft:"auto", marginRight:"5px"}}>
                        <Add fontSize='small' />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__chats">
                {
                    rooms.map((doc)=>{
                        return (<SidebarChat key={doc.id} id={doc.id} name={doc.data.name} /> )
                    })
                }
                
            </div>
        </div>
    )
}

export default Sidebaar
