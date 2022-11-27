import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

export const useEditBook = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const editBook = async (_id, name, author, publicationYear, pages, image, quantity) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`http://localhost:8001/books/${_id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id, name, author, publication_year: publicationYear, pages, image, quantity })
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {

      // Update loading state
      setIsLoading(false);

      // Navigate user to home
      navigate("/books");
    }
  };

  return { editBook, isLoading, error };
};