// import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./sidebaarChat.css";
import { Link, NavLink, useParams } from "react-router-dom";
import db from "./firebase";
import Avatar from 'react-avatar';

const SidebarChat = (props) => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState("");
  const id = props.id;

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snap) => setMessages(snap.docs.map((doc) => doc.data())));
    }
    return(
        setMessages("")
    )
  }, []);

  console.log(messages);

  return (
    <Link exact to={`/rooms/${id}`}>
      <div>
        <div className="sidebarchat">
        <Avatar name={props.name} size="42" textSizeRatio={1.75} round={true}  />
          <div className="sidebarchat__info">
            <h2>{props.name}</h2>
            <p>{messages[0]?.message}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
