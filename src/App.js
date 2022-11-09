import './App.css';
import Books from "./components/Books";
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import HomePage from './components/HomePage';

function App() {

  return (
    <BrowserRouter className="app">
      <Routes>
        <Route path='/' exact element={<HomePage />} />
        <Route path='/login' exact element={<LoginForm />} />
        <Route path='/register' exact element={<RegistrationForm />} />
        <Route path='/books' exact element={<Books />} />
        <Route path='/profile' exact element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
