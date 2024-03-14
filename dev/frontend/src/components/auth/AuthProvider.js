// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import pb from "../../lib/pocketbase.js"


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  const login = async (data) => {
    // Implement your login logic here, e.g., setting user data in state
    try {
      const authData = await pb.collection('users').authWithPassword(data.email, data.password)
      setUser(authData);
    } catch (e) {
      setAuthError("Invalid email or password");
    }
  };

  const logout = () => {
    // Implement your logout logic here, e.g., clearing user data from state
    pb.authStore.clear();
    setUser(null);
  };

  const signup = async (data) => {
    try {
      const authData = await pb.collection('users').create(data)
      setUser(authData);
    } catch (e) {
      if (data.password !== data.confirmPassword) {
        setAuthError("Passwords do not match");
      } else {
        setAuthError("An error occurred");
      }
    }
  
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, authError, signup, setAuthError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
