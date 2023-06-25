import React from 'react';
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../router/index.js";

const UserOptions = () => {

    const navigate = useNavigate();

    return (
        <div
            style={{
                width: '80%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '30px',
            }}
        >
            <div style={{
                width: '100%',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                borderRadius: '10px',
                backgroundColor: 'lightblue'
            }}
                 onClick={() => navigate(RouteNames.ENGLISH_LEVEL_TEST)}
            >
                Определить уровень языка
            </div>
            <div
                onClick={() => navigate(RouteNames.DICTIONARY)}
                style={{
                    width: '100%',
                    height: '60px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    backgroundColor: 'lightblue'
                }}
            >
                Словарь
            </div>
            <div
                onClick={() => navigate(RouteNames.MODE_WORKOUT)}
                style={{
                    width: '100%',
                    height: '60px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    backgroundColor: 'lightblue'
                }}
            >
                Режим Тренировка
            </div>
        </div>
    );
};

export default UserOptions;