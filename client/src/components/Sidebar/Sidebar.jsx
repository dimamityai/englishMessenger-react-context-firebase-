import React from 'react';
import Navbar from "../Navbar/Navbar.jsx";
import './style.scss'
import Search from "../Search/Search.jsx";
import Chats from "../Chats/Chats.jsx";
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Search/>
            <Chats/>
        </div>
    );
};

export default Sidebar;