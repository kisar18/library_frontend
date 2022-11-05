import './App.css';
import Books from "./components/Books";
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './components/Profile';

function App() {

  return (
    <BrowserRouter className="app">
      <Routes>
        <Route path='/' exact element={<RegistrationForm />} />
        <Route path='/login' exact element={<LoginForm />} />
        <Route path='/books' exact element={<Books />} />
        <Route path='/profile' exact element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
