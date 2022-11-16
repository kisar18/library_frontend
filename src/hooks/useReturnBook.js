import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useReturnBook = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();

  const returnBook = async (name) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:8001/user/', {
      headers: { 'Authorization': `Bearer ${user.token}` },
    });
    const json = await response.json();

    const username = json.username;

    const response2 = await fetch('http://localhost:8001/user/returnBook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, name })
    });
    const json2 = await response2.json();

    if (!response2.ok) {
      setIsLoading(false);
      setError(json2.error);
    }
    if (response2.ok) {
      // Update loading state
      setIsLoading(false);
    }
  };

  return { returnBook, isLoading, error };
};