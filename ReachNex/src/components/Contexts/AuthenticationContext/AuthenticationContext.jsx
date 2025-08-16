// src/components/Contexts/AuthenticationContext/AuthenticationContext.jsx
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const { id } = decoded;

        axios
          .get(`http://localhost:5000/ReachNex/getuser/${id}`)
          .then((res) => setUser(res.data.user))
          .catch((err) => {
            console.error("Token expired or fetch failed", err);
            localStorage.removeItem("token");
            setUser(null);
          });
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  return (
    <AuthenticationContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
