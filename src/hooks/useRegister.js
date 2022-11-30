import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate();

  const register = async (firstName, lastName, birthNumber, address, username, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:8001/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, birth_number: birthNumber, address, username, password })
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {

      // Update loading state
      setIsLoading(false);

      // Navigate user to his profile
      navigate("/");
    }
  };

  return { register, isLoading, error };
};