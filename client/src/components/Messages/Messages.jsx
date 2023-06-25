import React, {useContext, useEffect, useState} from 'react';
import Message from "../Message/Message.jsx";
import {ChatContext} from "../../context/ChatContext.jsx";
import {onSnapshot, doc} from "firebase/firestore";
import {db} from "../../Firebase/firebase.js";

const Messages = () => {
    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContext)

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'webChats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unSub()
        }
    }, [data.chatId])


    return (
        <div className="messages">
            {messages.map((m) => (
                <Message message={m} key={m.id}/>
            ))}
        </div>
    );
};

export default Messages;