import React, {useContext, useEffect, useState} from 'react';
import './style.scss'
import {TestAvatarImg, UserIcoWhite} from "../../utils/imgConsts.js";
import {signOut} from 'firebase/auth'
import {auth} from "../../Firebase/firebase.js";
import {AuthContext} from "../../context/AuthContext.jsx";
import {Button} from "antd";
import Loader from "../Loader.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../../router/index.js";
const Navbar = () => {
    const {currentUser} = useContext(AuthContext)
    const [err, setErr] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();
        useEffect(() => {
            let img = new Image();
            img.src = currentUser.photoURL;
            img.onerror  = function(){
                setErr(true)
            };
            setIsLoading(false)
        }, [])

    return (
        <div className='navbar'>
            <div className='navbar__item'>
                <span
                    className="logo"
                    style={{
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate(RouteNames.HOME)}
                >
                    English Messenger
                </span>
                <div className="user">
                    {isLoading
                        ?
                        <Loader/>
                        :
                        <>
                            <span>{currentUser.displayName}</span>
                            <img
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    cursor: 'pointer'
                                }}
                                onClick={() => navigate(RouteNames.USER_INFO)}
                                src={err ? UserIcoWhite : currentUser.photoURL}
                                alt=''
                            />
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;