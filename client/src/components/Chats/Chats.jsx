import React, {useContext, useEffect, useState} from 'react';
import {doc, onSnapshot} from 'firebase/firestore'
import './style.scss'
import {db} from "../../Firebase/firebase.js";
import {AuthContext} from "../../context/AuthContext.jsx";
import {ChatContext} from "../../context/ChatContext.jsx";
import {UserIcoWhite} from "../../utils/imgConsts.js";

const Chats = () => {
    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)
    const [chats, setChats] = useState([])
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'webUserChats', currentUser.uid), (doc) => {
                setChats(doc.data() || [])
            });
            return () => {
                unsub();
            }
        }
        currentUser.uid && getChats()

    }, [currentUser.uid])

    const handleSelect = (u) => {
        dispatch({type: 'CHANGE_USER', payload: u})
    }

    
    return (
        <div className='chats'>
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map(chat => {
                    return (
                        <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                            <img
                                src={chat[1].userInfo.photoURL}
                                alt=''
                            />
                            <div className="userChatInfo">
                                <span>{chat[1].userInfo.displayName}</span>
                                <p>{chat[1].lastMessage?.text}</p>
                            </div>
                        </div>
                    )
                }
            )}
        </div>
    );
};

export default Chats;