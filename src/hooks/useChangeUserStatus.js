import { useState } from 'react';

export const useChangeUserStatus = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const changeUserStatus = async (username, newStatus) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`http://localhost:8001/users/${username}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, newStatus })
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {

      // Update loading state
      setIsLoading(false);
    }
  };

  return { changeUserStatus, isLoading, error };
};