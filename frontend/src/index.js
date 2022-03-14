//@ts-check
import React, { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Components/Login';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';
import { PrivateRoute } from './Components/Common/PrivateRoute';
import Home from './Components/Home';
import Questions from './Components/Questions';
import { setupInterceptorsTo } from './Services/Interceptors';
import axios from 'axios';
import Dashboard from './Components/Dashboard';
import { getMyProfile } from './Services/user-service';

setupInterceptorsTo(axios);

export const GlobalContext = createContext({
    userInfo: {},
    setUserInfo: null,
    updateUserInfo: null
});

const Index = () => {
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        // setSocket(socket);
        onLoad();
    }, []);

    const onLoad = async () => {
        const userInfoJSON = localStorage.getItem('user');
        if (userInfoJSON) {
            let userInfoObject = JSON.parse(userInfoJSON);
            let { data: userInfo } = await getMyProfile();
            let updated = {
                ...userInfoObject,
                ...userInfo
            };
            localStorage.setItem('user', JSON.stringify(updated));
            setUserInfo(updated);
        }
    };
    const updateUserInfo = () => {
        onLoad();
    };

    return (
        <React.StrictMode>
            <ChakraProvider theme={theme}>
                <GlobalContext.Provider
                    value={{
                        userInfo,
                        setUserInfo,
                        updateUserInfo
                    }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/*"
                                element={
                                    <PrivateRoute loginPath={'/login'}>
                                        <Home />
                                    </PrivateRoute>
                                }>
                                <Route
                                    index
                                    element={
                                        <PrivateRoute loginPath={'/login'}>
                                            <Dashboard />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="questions"
                                    element={
                                        <PrivateRoute loginPath={'/login'}>
                                            <Questions />
                                        </PrivateRoute>
                                    }
                                />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </GlobalContext.Provider>
            </ChakraProvider>
        </React.StrictMode>
    );
};

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
