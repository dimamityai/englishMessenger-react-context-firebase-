import React, {useContext} from 'react';
import {Add, Cam, More} from "../../utils/imgConsts.js";
import './style.scss'
import Messages from "../Messages/Messages.jsx";
import ChatInput from "../ChatInput/ChatInput.jsx";
import {ChatContext} from "../../context/ChatContext.jsx";
const Chat = () => {
    const { data } = useContext(ChatContext)

    return (
        <div className='chat'>
            <div className="chatInfo">
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: '10px'
                    }}
                >
                    {data.user?.photoURL && <img
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginLeft: '10px'
                        }}
                        src={data.user?.photoURL}
                        alt=""/>}
                    <span>{data.user?.displayName}</span>
                </div>
                {data.user?.photoURL &&
                    <div className="chatIcons">
                    <img src={Add} alt=""/>
                    <img src={More} alt=""/>
                </div>}
            </div>
            <Messages/>
            <ChatInput/>
        </div>
    );
};

export default Chat;