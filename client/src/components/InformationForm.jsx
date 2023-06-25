import {Button, Form, Input} from 'antd';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext.jsx";
import {UserIcoWhite} from "../utils/imgConsts.js";
import {signOut} from "firebase/auth";
import {auth} from "../Firebase/firebase.js";
import Loader from "./Loader.jsx";
import UserOptions from "./UserOptions.jsx";


const InformationForm = () => {
    const {currentUser} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true);
    const [info, setInfo] = useState({
        email: currentUser.email,
        displayName: currentUser.displayName,
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        avatar: ''
        // surname: user.surname,
        // gender: user.gender,
        // patronymic: user.patronymic
    })

    useEffect(() => {
        let img = new Image();
        img.src = currentUser.photoURL;
        img.onload = function () {
            setInfo({...info, avatar: currentUser.photoURL})
            setIsLoading(false)
        };
        img.onerror = function () {
            setInfo({...info, avatar: UserIcoWhite})
            setIsLoading(false)
        };
    })

    return (
        <div className='formInformationContainer'>
            {isLoading
                ?
                    <Loader/>
                :
                <div
                    style={{
                        // border: '1px solid black',
                        width: '800px'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: 'start',
                            flexDirection: "row",
                            gap: '20px'
                        }}
                    >
                        <img style={{
                            marginLeft: 10,
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }} src={info.avatar} alt=''/>
                        <div
                            style={{
                                marginTop: 20,
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%'
                            }}
                        >
                            <Form.Item
                                label={'Имя: '}
                            >
                                <Input
                                    disabled={true}
                                    style={{
                                        outline: 'none',
                                        border: 'none',
                                        color: 'white',
                                        cursor: 'default'
                                    }}
                                    value={currentUser.displayName}
                                    onChange={(e) => setInfo({...info, name: e.target.value})}
                                />
                            </Form.Item>
                            <Form.Item
                                label={'Email: '}
                            >
                                <Input
                                    style={{
                                        color: 'white',
                                        outline: 'none',
                                        border: 'none',
                                        cursor: 'default'

                                    }}
                                    disabled={true}
                                    value={currentUser.email}
                                    onChange={(e) => setInfo({...info, name: e.target.value})}
                                />
                            </Form.Item>
                            <Form.Item
                                label={'Текущий уровень английского: '}
                            >
                                <Input
                                    style={{
                                        color: 'white',
                                        outline: 'none',
                                        border: 'none',
                                        cursor: 'default'

                                    }}
                                    disabled={true}
                                    value={'B2'}
                                    onChange={(e) => setInfo({...info, name: e.target.value})}
                                />
                            </Form.Item>
                            <div
                                style={{

                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'end',
                                }}>
                                <Button
                                    style={{
                                        marginRight: 20,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        backgroundColor: 'blue',
                                        color: 'white',
                                        width: '100px'
                                    }}>
                                    Изменить
                                </Button>
                                <Button
                                    danger
                                    style={{marginRight: 20,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        width: '100px'
                                    }}
                                    onClick={() => signOut(auth)}>
                                    Выйти
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            marginTop: 100,
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center'
                        }}
                    >
                        <UserOptions/>
                    </div>

                </div>
            }
        </div>
    );
};
// console.log(currentUser.displayName)
export default InformationForm;