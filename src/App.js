import './App.css';
import Books from "./components/Books";
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Profile from './components/Profile';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Users from "./components/Users";
import CreateBookForm from "./components/CreateBookForm";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {

  const { user } = useAuthContext();

  return (
    <BrowserRouter className="app">
      <Navbar></Navbar>
      <Routes>
        <Route
          exact path='/'
          element={<HomePage />}
        />
        <Route
          exact path='/login'
          element={!user ? <LoginForm /> : <Navigate to="/" />}
        />
        <Route
          exact path='/register'
          element={!user || user.username === "admin" ? <RegistrationForm /> : <Navigate to="/" />}
        />
        <Route
          exact path='/users'
          element={user && user.username === "admin" ? <Users /> : <Navigate to="/" />}
        />
        <Route
          exact path='/books'
          element={user ? <Books /> : <Navigate to="/login" />}
        />
        <Route
          exact path='/profile'
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          exact path='/createBook'
          element={user && user.username === "admin" ? <CreateBookForm /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
