// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import pb from "../../lib/pocketbase.js"


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoginError, setAuthLoginError] = useState(null);
  const [authSignupError, setAuthSignupError] = useState(null)
  const [authLoginSuccess, setauthLoginSuccess] = useState(null)
  const [authSignupSuccess, setauthSignupSuccess] = useState(null)

  const login = async (data) => {
    // Implement your login logic here, e.g., setting user data in state

    setAuthLoginError(null);
    try {
      const authData = await pb.collection('users').authWithPassword(data.email, data.password)
      setUser(authData);
      console.log("success")
    } catch (e) {
      setAuthLoginError("Invalid email or password");
    }
  };

  const logout = () => {
    // Implement your logout logic here, e.g., clearing user data from state
    pb.authStore.clear();
    setUser(null);
  };

  const signup = async (sent_data) => {

    setAuthSignupError(null);

    try {
      let data = sent_data;
      if (data.subscription === true) {
        data.subscription = 1
      } else {
        data.subscription = 0
      }
      const authData = await pb.collection('users').create(data)
      setUser(authData);
      
    } catch (e) {
      console.log(e.response)
      if (e.response.data !== undefined) {

        if (e.response.data.email !== undefined) {
          setAuthSignupError(e.response.data.email.message);
        } else if (e.response.data.password !== undefined) {
          setAuthSignupError(e.response.data.password.message);
        } else if (sent_data.password !== sent_data.passwordConfirm) {
          setAuthSignupError("Passwords do not match.");
        } else {
          setAuthSignupError("An error occurred");
        }

      } else {
        setAuthSignupError("An error occurred");
      }
    }
  
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      authSignupError, 
      authLoginError,
      authLoginSuccess,
      authSignupSuccess,

      signup, 
      setAuthLoginError,
      setAuthSignupError 
      
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
