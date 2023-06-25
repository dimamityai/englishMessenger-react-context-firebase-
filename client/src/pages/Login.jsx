import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import {useNavigate, Link, Navigate} from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from "../Firebase/firebase.js";
import ErrorMessage from "../components/ErrorMessage.jsx";
import {RouteNames} from "../router/index.js";
const Login = () => {
    const [errorInput, setErrorInput] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        if (email === '' || password === '') {
            if (email === ''){
                setErrorInput(true)
            }
            if (password === ''){
                setErrorPassword(true)
            }
        } else {
            try {
                await signInWithEmailAndPassword(auth, email, password)
                navigate(RouteNames.HOME)
            } catch (e) {
                setErr(true)
            }
        }
    }

    const errorDefaultInput = () =>{
        setErr(false);
        setErrorInput(false);
    }

    const errorDefaultPassword = () =>{
        setErr(false);
        setErrorPassword(false);
    }

    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className="logo">English Messenger</span>
                <span className="title">Авторизация</span>

                <form onSubmit={handleSubmit}>
                    <Input type="email" placeholder="email" onChange={errorDefaultInput}/>
                    <ErrorMessage isError={errorInput} errorMessage={'поле обязательно для заполнения!'}/>
                    <Input type="password" placeholder="пароль" onChange={errorDefaultPassword}/>
                    <ErrorMessage isError={errorPassword} errorMessage={'поле обязательно для заполнения!'}/>
                    <Button htmlType={'submit'}>Войти</Button>
                    {err && <span
                        style={{
                            display: 'flex',
                            alignItems:"center",
                            justifyContent: 'center',
                            color: 'red'
                        }}>
                        Введена неверная почта или пароль
                    </span>}
                </form>
                <p>Нет аккаунта? <Link to={RouteNames.REGISTRATION}>Зарегистрируйтесь</Link></p>
            </div>
        </div>
    );
};

export default Login;