import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { baseUrl } from "../constants/baseUrl";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);


  const login = async (inputs) => {
    try {
      const res = await axios.post(`${baseUrl}/login`, inputs)
      setCurrentUser(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    try {
      await axios.post(`${baseUrl}/logout`)
      setCurrentUser(null)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
