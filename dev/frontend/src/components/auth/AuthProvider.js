// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import pb from "../../lib/pocketbase.js"


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Implement your login logic here, e.g., setting user data in state
    setUser(userData);
  };

  const logout = () => {
    // Implement your logout logic here, e.g., clearing user data from state
    pb.authStore.clear();
    setUser(null);
  };

  const signup = (userData) => {
    setUser(userData);

  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      signup
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
