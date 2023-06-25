import {createContext, useContext, useEffect, useReducer, useState} from "react";
import {AuthContext} from "./AuthContext.jsx";
export const ChatContext = createContext(null)

export const ChatContextProvider = ({children}) => {
    const {currentUser} = useContext(AuthContext)

    const INITIAL_STATE = {
        chatId:'null',
        user:{}
    }

    const chatReducer = (state = INITIAL_STATE, action) => {
        switch(action.type){
            case "CHANGE_USER":
                return {
                    user:action.payload,
                    chatId: currentUser.uid > action.payload.uid
                        ? currentUser.uid + action.payload.uid
                        : action.payload.uid + currentUser.uid
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return (
        <ChatContext.Provider value={{data:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
};