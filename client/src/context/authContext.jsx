import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);


  const login = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:5000/login", inputs)
      setCurrentUser(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/logout")
      setCurrentUser(null)
    } catch (error) {
      console.log(error.message)
    }
  }

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(currentUser))
  // }, [currentUser])
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
