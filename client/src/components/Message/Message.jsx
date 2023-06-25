import React, {useContext, useEffect, useRef} from 'react';
import {AuthContext} from "../../context/AuthContext.jsx";
import {ChatContext} from "../../context/ChatContext.jsx";
const Message = ({message}) => {
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: 'smooth'})
    }, [message])

    return (
        <div ref ={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
            <div className="messageInfo">
                <img src={message.senderId === currentUser.uid
                    ? currentUser.photoURL
                    : data.user.photoURL} alt=''/>
                <span>{message.senderId === currentUser.uid
                    ? currentUser.displayName
                    : data.user.displayName}</span>
            </div>
                <div className='messageContent'>
                    <p>{message.text}</p>
                    {message.img && <img
                        style={{
                            maxWidth: '400px',
                            maxHeight: '400px',
                            objectFit: 'cover'
                        }}
                        src={message.img}
                        alt=''
                    />}
                </div>
            <div className="messageContent"></div>
        </div>
    );
};

export default Message;