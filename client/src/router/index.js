import React from "react";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Home from "../pages/Home/Home.jsx";
import Information from "../pages/Information.jsx";
import EnglishLevelTest from "../pages/EnglishLevelTest.jsx";
import Dictionary from "../pages/Dictionary.jsx";
import ModeWorkout from "../pages/ ModeWorkout.jsx";


export const RouteNames = {
    LOGIN: '/login',
    HOME:  '/',
    REGISTRATION: '/registration',
    USER_INFO: '/user_info',
    ENGLISH_LEVEL_TEST: '/level',
    DICTIONARY: '/dictionary',
    MODE_WORKOUT: '/mode_workout',
}

export const publicRoutes = [
    {
        path: RouteNames.LOGIN,
        component: Login
    },
    {
        path: RouteNames.REGISTRATION,
        component: Register
    },
]

export const privateRoutes = [
    {
        path: RouteNames.HOME,
        component: Home
    },
    {
        path: RouteNames.USER_INFO,
        component: Information
    },
    {
        path: RouteNames.ENGLISH_LEVEL_TEST,
        component: EnglishLevelTest
    },
    {
        path: RouteNames.DICTIONARY,
        component: Dictionary
    },
    {
        path: RouteNames.MODE_WORKOUT,
        component: ModeWorkout
    }
]