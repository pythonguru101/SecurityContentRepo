//@ts-check
import './App.css';
import { PrivateRoute } from './Components/Common/PrivateRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';

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
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
