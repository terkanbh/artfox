import { createContext, useState, useEffect }   from 'react';
import { jwtDecode }                            from 'jwt-decode';

import { login as loginRequest } from '~/services/authService.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token && !expiredToken(token))
      setIsAuthenticated(true);
    else removeToken();
  }, []);

  const saveToken = (token) => localStorage.setItem('token', token);
  const removeToken = () => localStorage.removeItem('token');
  const getToken = () => localStorage.getItem('token');
  const expiredToken = (token) => {
    const { iat, exp } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const halfLife = iat + (exp - iat) / 2;
    return currentTime >= halfLife;
  };

  const login = (data) => {
    return loginRequest(data).then(res => {
        saveToken(res.token);
        setIsAuthenticated(true);
      });
  }
  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}