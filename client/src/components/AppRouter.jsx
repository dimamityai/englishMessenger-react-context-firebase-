import React, {FC, useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {privateRoutes, publicRoutes, RouteNames} from '../router';
import {AuthContext} from "../context/AuthContext.jsx";
import Navbar from "./Navbar/Navbar.jsx";
const AppRouter = () => {
    const {currentUser} = useContext(AuthContext)
    return (
        currentUser
            ?
            <>
                <Navbar/>
                <Routes>
                    {privateRoutes.map(({path, component : Component}) =>
                        <Route
                            key={path}
                            path={path}
                            element={<Component/>}
                        />
                    )}
                    <Route path="*" element={<Navigate to = {RouteNames.HOME} replace/>}/>
                </Routes>
            </>
            :
            <Routes>
                {publicRoutes.map(({path, component : Component}) =>
                    <Route
                        key={path}
                        path={path}
                        element={<Component/>}
                    />
                )}
                <Route path="*" element={<Navigate to = {RouteNames.LOGIN} replace/>}/>
            </Routes>
    );
};

export default AppRouter;