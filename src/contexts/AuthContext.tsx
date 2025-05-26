import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, LoginData, RegisterData } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('nmhUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (data: LoginData): Promise<void> => {
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw result.error || 'Đăng nhập thất bại';
      setCurrentUser(result.user);
      setIsAuthenticated(true);
      localStorage.setItem('nmhUser', JSON.stringify(result.user));
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(typeof err === 'string' ? err : 'Đăng nhập thất bại');
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    try {
      const res = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw result.error || 'Đăng ký thất bại';
      // Auto-login after register (optional)
      await login({ email: data.email, password: data.password });
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(typeof err === 'string' ? err : 'Đăng ký thất bại');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('nmhUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};