//@ts-check
import React from 'react';
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
import Answers from './Components/Answers';

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
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
                                    <App />
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
                        <Route
                            path="answers"
                            element={
                                <PrivateRoute loginPath={'/login'}>
                                    <Answers />
                                </PrivateRoute>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
