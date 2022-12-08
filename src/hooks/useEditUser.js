import { useState } from 'react';
import { useLogout } from "../hooks/useLogout";

export const useEditUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { logout } = useLogout();

  const editUser = async (_id, firstName, lastName, birthNumber, address, username, password, accountStatus) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`http://localhost:8001/users/${username}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id, first_name: firstName, last_name: lastName, birth_number: birthNumber, address, username, password, account_status: "waiting" })
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {

      // Update loading state
      setIsLoading(false);

      logout();
    }
  };

  return { editUser, isLoading, error };
};