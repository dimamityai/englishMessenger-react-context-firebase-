import React, {useContext, useEffect, useState} from 'react';
import './style.scss'
import {collection, query, where, getDoc, setDoc, getDocs, updateDoc, doc, serverTimestamp} from 'firebase/firestore'
import {TestAvatarImg} from "../../utils/imgConsts.js";
import {db} from "../../Firebase/firebase.js";
import {AuthContext} from "../../context/AuthContext.jsx";
const Search = () => {
    const [userName, setUserName] = useState('')
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)
    const {currentUser} = useContext(AuthContext)

    const handleSearch = async () =>{
        const q = query(collection(db, 'webUsers'), where('name', '==', userName))
        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            })
        } catch (e){
            setErr(true)
        }
    }

    const handleSelect = async () => {
        const combinedId =
            currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;
        try{
            const res = await getDoc(doc(db, 'webChats', combinedId));
            if (!res.exists()){
                await setDoc(doc(db, 'webChats', combinedId), {messages:[]} );
                await updateDoc(doc(db, 'webUserChats', currentUser.uid), {
                    [combinedId+".userInfo"]: {
                        uid: user.uid,
                        displayName: user.name,
                        photoURL: user.photoURL
                    },
                    [combinedId+".date"]: serverTimestamp()
                })
                await updateDoc(doc(db, 'webUserChats', user.uid), {
                    [combinedId+".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId+".date"]: serverTimestamp()
                })
            } else {
                console.log('ЧАТ УЖЕ СОЗДАН!!!!!!')
            }
        } catch (e){

        }
        setUser(null)
        setUserName('')

    }

    const handleKey = e => {
        if (e.code === 'Enter'){
            handleSearch()
        }
    }

    return (
        <div className="search">
            <div className='searchFrom'>
                <input
                    value={userName}
                    type="text"
                    placeholder='Найти пользователя'
                    onKeyDown={handleKey}
                    onChange={e => setUserName(e.target.value)}
                />
            </div>
            {err && <span>Пользователь не был найден</span>}
            {user && <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL}/>
                <div className="userChatInfo">
                    <span>{user.name}</span>
                </div>
            </div>}
        </div>
    );
};

export default Search;