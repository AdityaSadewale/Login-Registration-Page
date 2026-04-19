import React, { createContext, useContext, useState, useEffect } from 'react';
import fetchClient from '../api/fetchClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const data = await fetchClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setUser(data.user);
    return data;
  };

  const signup = async (username, email, password) => {
    return await fetchClient('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  };

  const logout = async () => {
    try {
      await fetchClient('/auth/logout', { method: 'POST' });
    } finally {
      setUser(null);
    }
  };

  const checkAuth = async () => {
    try {
      const data = await fetchClient('/auth/me');
      setUser(data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    const handleAuthExpired = () => {
      setUser(null);
    };

    window.addEventListener('auth-auth-expired', handleAuthExpired);
    return () => window.removeEventListener('auth-auth-expired', handleAuthExpired);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
