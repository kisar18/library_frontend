import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';
import { useBooksContext } from './useBooksContext';

export const useDeleteBook = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useBooksContext();

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const deleteBook = async (_id) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`http://localhost:8001/books/${_id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      }
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      dispatch({ type: 'DELETE_BOOK', payload: json });

      // Update loading state
      setIsLoading(false);

      // Navigate user to home
      navigate("/books");
    }
  };

  return { deleteBook, isLoading, error };
};