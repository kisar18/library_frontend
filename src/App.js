import './App.css';
import Books from "./components/Books";
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter className="app">
      <Routes>
        <Route path='/' exact element={<RegistrationForm />} />
        <Route path='/login' exact element={<LoginForm />} />
        <Route path='/books' exact element={<Books />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
