import { createContext, useContext, useEffect, useState } from 'react';
import { fetchProfile, loginRequest } from './api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetchProfile(token)
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        setToken(null);
        localStorage.removeItem('authToken');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const login = async (username, password) => {
    setError(null);
    try {
      const data = await loginRequest(username, password);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('authToken', data.token);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
