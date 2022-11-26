import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooksContext } from './useBooksContext';
import { useAuthContext } from './useAuthContext';

export const useCreateBook = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useBooksContext();

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const createBook = async (name, author, publicationYear, pages, image, quantity) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:8001/books', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, author, publication_year: publicationYear, pages, image, quantity })
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // Update the books context
      dispatch({ type: 'CREATE_BOOK', payload: json });

      // Update loading state
      setIsLoading(false);

      // Navigate user to home
      navigate("/");
    }
  };

  return { createBook, isLoading, error };
};