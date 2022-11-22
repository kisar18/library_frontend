import { useAuthContext } from './useAuthContext';

export const useGetUser = () => {

  const { user } = useAuthContext();

  const fetchUserData = async () => {
    const response = await fetch(`http://localhost:8001/user/${user.username}`, {
      headers: { 'Authorization': `Bearer ${user.token}` },
    });
    const json = await response.json();

    return json;
  };

  return { fetchUserData };
};