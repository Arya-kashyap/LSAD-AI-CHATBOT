import { useState, useEffect, createContext, useContext } from 'react';
import cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  // Hydrate token from localStorage or cookies
  useEffect(() => {
    const token = localStorage.getItem('token') || cookies.get('token');
    if (token) setAuthToken(token);
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
