import {jwtDecode} from 'jwt-decode';

const useAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded; // return whole user info
  } catch (err) {
    console.error('Invalid token');
    return null;
  }
};

export default useAuth;
