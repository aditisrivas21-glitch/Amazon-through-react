import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem('amazon_clone_users');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const activeSession = localStorage.getItem('amazon_clone_session');
    if (activeSession) {
      setUser(JSON.parse(activeSession));
    }
  }, []);

  const register = (username, email, password) => {
    if (usersList.some(u => u.email === email)) {
      return { success: false, message: "Email is already registered" };
    }
    const newUser = { username, email, password };
    const updatedUsers = [...usersList, newUser];
    setUsersList(updatedUsers);
    localStorage.setItem('amazon_clone_users', JSON.stringify(updatedUsers));
    
    // Automatically log in after registration
    setUser({ username, email });
    localStorage.setItem('amazon_clone_session', JSON.stringify({ username, email }));
    return { success: true, message: "Account created successfully!" };
  };

  const login = (email, password) => {
    const existingUser = usersList.find(u => u.email === email);
    if (!existingUser) {
      return { success: false, message: "No account found with this email" };
    }
    if (existingUser.password !== password) {
      return { success: false, message: "Incorrect password" };
    }
    const sessionUser = { username: existingUser.username, email: existingUser.email };
    setUser(sessionUser);
    localStorage.setItem('amazon_clone_session', JSON.stringify(sessionUser));
    return { success: true, message: `Welcome back, ${existingUser.username}!` };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('amazon_clone_session');
    return { success: true, message: "Logged out successfully" };
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
