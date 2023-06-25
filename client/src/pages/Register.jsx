import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import {AddAvatar} from "../utils/imgConsts.js";
import {auth, db, storage} from '../Firebase/firebase'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import {Link, useNavigate} from "react-router-dom";
import {RouteNames} from "../router/index.js";
const Register = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const name = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                (error) => {
                    console.log(error)
                setErr(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName: name,
                            photoURL: downloadURL
                        })
                        await setDoc(doc(db, "webUsers", res.user.uid),{
                            uid: res.user.uid,
                            name,
                            email,
                            photoURL: downloadURL
                        })
                        await setDoc(doc(db, "webUserChats", res.user.uid),{})
                    });
                }
            );
            alert('Вы успешно зарегистрировались!')
            navigate(RouteNames.LOGIN)
        } catch (e){
            console.log(e)
            setErr(true)
        }
    }

    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className="logo">English Messenger</span>
                <span className="title">Регистрация</span>

                <form onSubmit={handleSubmit}>
                    <Input type="text" placeholder="имя"/>
                    <Input type="email" placeholder="email"/>
                    {/*<input style={{border: 'none'}} placeholder="пароль"/>*/}
                    <Input type="password" placeholder="пароль"/>
                    <Input style={{display: "none"}} type="file" id="file"/>
                    <label htmlFor="file">
                        <img src={AddAvatar} alt=""/>
                        <span>Добавить аватар</span>
                    </label>
                    <Button htmlType={'submit'}>Зарегистрироваться</Button>
                </form>
                {err && <span>Что-то пошло не так</span>}
                <p>Уже есть аккаунт? <Link to={RouteNames.LOGIN}>Войдите</Link></p>
            </div>
        </div>
    );
};

export default Register;