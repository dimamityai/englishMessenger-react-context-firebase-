import "./style.scss"
import {BrowserRouter,} from "react-router-dom";
import React, {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";
import AppRouter from "./components/AppRouter.jsx";
import Loader from "./components/Loader.jsx";
function App() {
    const {isLoading} = useContext(AuthContext)

    return (
        <BrowserRouter>
            {isLoading
                ?
                <div className='formContainer'>
                    <Loader/>
                </div>
                :
                <AppRouter/>
            }
        </BrowserRouter>
    )
}

export default App;
