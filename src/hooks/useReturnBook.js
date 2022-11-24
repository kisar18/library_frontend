import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useBooksContext } from './useBooksContext';

export const useReturnBook = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();
  const { dispatch } = useBooksContext();

  const returnBook = async (name) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`http://localhost:8001/user/${user.username}`, {
      headers: { 'Authorization': `Bearer ${user.token}` },
    });
    const json = await response.json();

    const username = json.user.username;

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

      dispatch({ type: 'SET_BOOKS', payload: json2.userBooks });
    }
  };

  return { returnBook, isLoading, error };
};