import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useBooksContext } from './useBooksContext';

export const useBorrow = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();
  const { dispatch } = useBooksContext();

  const borrow = async (_id, userN) => {
    setIsLoading(true);
    setError(null);

    var username;

    if (userN === undefined) {
      const response = await fetch(`http://localhost:8001/users/${user.username}`, {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      username = json.user.username;
    }
    else {
      username = userN;
    }

    const response2 = await fetch('http://localhost:8001/users/borrow', {
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
      dispatch({ type: 'SET_BOOKS', payload: json2.books });
    }

    const response3 = await fetch('http://localhost:8001/histories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: username, bookId: _id })
    });

    const json3 = await response3.json();

    if (!response3.ok) {
      setIsLoading(false);
      setError(json3.error);
    }

    if (response3.ok) {
      // Update loading state
      setIsLoading(false);
    }
  };

  return { borrow, isLoading, error };
};