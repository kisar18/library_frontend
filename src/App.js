import './App.css';
import Books from "./components/Books";
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Profile from './components/Profile';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import { useAuthContext } from "./hooks/useAuthContext";

function App() {

  const { user } = useAuthContext();

  return (
    <BrowserRouter className="app">
      <Navbar></Navbar>
      <Routes>
        <Route
          path='/'
          exact element={<HomePage />}
        />
        <Route
          path='/login'
          exact element={!user ? <LoginForm /> : <Navigate to="/" />}
        />
        <Route
          path='/register'
          exact element={!user ? <RegistrationForm /> : <Navigate to="/" />}
        />
        <Route
          path='/books'
          exact element={user ? <Books /> : <Navigate to="/login" />}
        />
        <Route
          path='/profile'
          exact element={user ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
