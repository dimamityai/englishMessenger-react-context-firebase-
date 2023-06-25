import {createContext, useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth"
import {auth} from "../Firebase/firebase.js";
export const AuthContext = createContext(null)

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user)
            setIsLoading(false)
        })
        return () => {
            unsub()
        }
    }, []);

    return (
    <AuthContext.Provider value={{currentUser, isLoading}}>
        {children}
    </AuthContext.Provider>
    )
};