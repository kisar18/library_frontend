import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext";
import Books from "./components/Books";
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import Users from "./components/Users";
import CreateBookForm from "./components/CreateBookForm";
import EditBookForm from "./components/EditBookForm";
import DeleteBook from "./components/DeleteBook";
import History from './components/History';
import AdminBorrowForm from './components/AdminBorrowForm';
import EditUserForm from './components/EditUserForm';

function App() {

  const { user } = useAuthContext();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8001/histories/checkHistory");
      if (response.ok) {
        console.log("Check succeded");
      }
    }

    const id = setInterval(function () {
      const now = new Date();
      if (now.getHours() === 1) {
        fetchData();
      }
      else return;
    }, 3600000);
    return () => clearInterval(id);
  }, []);

  const showMobileMenu = () => {
    setMobileMenuVisible(true);
  };

  const closeMobileMenu = () => {
    if (mobileMenuVisible) {
      setMobileMenuVisible(false);
    }
  };

  return (
    <BrowserRouter className="app">
      <Navbar
        onShowMobileMenu={showMobileMenu}
        onCloseMobileMenu={closeMobileMenu}
      />
      {mobileMenuVisible && (<MobileMenu onCloseMobileMenu={closeMobileMenu} />)}
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
        <Route
          exact path='/editBook'
          element={user && user.username === "admin" ? <EditBookForm /> : <Navigate to="/" />}
        />
        <Route
          exact path='/deleteBook'
          element={user && user.username === "admin" ? <DeleteBook /> : <Navigate to="/" />}
        />
        <Route
          exact path='/history'
          element={user ? <History /> : <Navigate to="/" />}
        />
        <Route
          exact path='/adminBorrow'
          element={user && user.username === "admin" ? <AdminBorrowForm /> : <Navigate to="/" />}
        />
        <Route
          exact path='/editUser'
          element={user ? <EditUserForm /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
