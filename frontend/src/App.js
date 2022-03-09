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
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute loginPath={'/login'}>
                            <Home />
                        </PrivateRoute>
                    }>
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
        </div>
    );
}

export default App;
