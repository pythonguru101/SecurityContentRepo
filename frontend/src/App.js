//@ts-check
import './App.css';
import { PrivateRoute } from './Components/Common/PrivateRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Questions from './Components/Questions';
import Answers from './Components/Answers';

function App() {
    return (
        <div className="App">
            Home
        </div>
    );
}

export default App;
