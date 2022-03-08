//@ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Components/Login';
import {
    ChakraProvider,
    ColorModeScript
} from '@chakra-ui/react';
import theme from './theme';

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<App />} />
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
