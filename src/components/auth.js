import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'

const authUser = async () => {
  let response = await axios.get('../api/login/auth')
  let user = await response.data

  return user
}
const AuthContext = createContext();

export function  AuthProvider({ children }) {
  
  let user = authUser()
  
  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}