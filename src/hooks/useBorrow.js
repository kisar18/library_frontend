import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useBorrow = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const borrow = async (_id) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:8001/user/', {
      headers: { 'Authorization': `Bearer ${user.token}` },
    });
    const json = await response.json();

    const username = json.username;

    const response2 = await fetch('http://localhost:8001/user/borrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, _id })
    });
    const json2 = await response2.json();

    if (!response2.ok) {
      setIsLoading(false);
      setError(json2.error);
    }
    if (response2.ok) {
      // Update loading state
      setIsLoading(false);

      // Navigate user to his profile
      navigate("/profile");
    }
  };

  return { borrow, isLoading, error };
};