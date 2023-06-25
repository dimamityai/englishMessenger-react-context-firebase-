import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Chat from "../../components/Chat/Chat.jsx";
import "./style.scss"
const Home = () => {
    return (
        <div className='home'>
            <div className='container'>
                <Sidebar/>
                <Chat/>
            </div>
        </div>
    );
};

export default Home;