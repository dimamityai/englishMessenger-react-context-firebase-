import React, {useContext, useState} from 'react';
import './style.scss'
import {AddImg, Attach} from "../../utils/imgConsts.js";
import {AuthContext} from "../../context/AuthContext.jsx";
import {ChatContext} from "../../context/ChatContext.jsx";
import {updateDoc, doc, arrayUnion, Timestamp, setDoc, serverTimestamp} from 'firebase/firestore'
import {db, storage} from "../../Firebase/firebase.js";
import { v4 as uuid } from 'uuid'
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {updateProfile} from "firebase/auth";

const ChatInput = () => {
    const [text, setText] = useState('')
    const [img, setImg] = useState(null)

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const handleSend = async () => {
        if (img){
            const storageRef = ref(storage, uuid())

            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
                (error) => {
                    console.log(error)
                    // setErr(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, 'webChats', data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL
                            })
                        })
                    });
                }
            );
        } else{
            await updateDoc(doc(db, 'webChats', data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                })
            })
        }

        await updateDoc(doc(db, 'webUserChats', currentUser.uid),{
            [data.chatId+'.lastMessage']:{
                text
            },
            [data.chatId+'.date']:serverTimestamp()
        });

        await updateDoc(doc(db, 'webUserChats', data.user.uid),{
            [data.chatId+'.lastMessage']:{
                text
            },
            [data.chatId+'.date']:serverTimestamp()
        });

        setText('')
        setImg(null)
    }

    return (
        <div className='chatInput'>
            <input
                value={text}
                type='text'
                placeholder='Напишите сообщение...'
                onChange={e => setText(e.target.value)}
            />
            <div className='send'>
                <img src={Attach} alt=''/>
                <input
                    type='file'
                    style={{display: "none"}}
                    id='file'
                    onChange={e => setImg(e.target.files[0])}
                />
                <label htmlFor='file'>
                    <img src={AddImg} alt=''/>
                </label>
                <button onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatInput;