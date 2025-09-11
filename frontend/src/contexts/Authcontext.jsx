import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

//   useEffect(()=>{
//     const token = localStorage.getItem("token");
//     if (!token) return;
//     axios.get('http://localhost:5000/api/users',{
//       headers:{
//         Authorization: `Bearer ${token}`
//       },
//     })
// .then((res)=>{
//   setUser(res.data);
//   localStorage.setItem("user", JSON.stringify(res.data));
// })
// .catch(()=>{
//   setUser(null);
//   localStorage.removeItem("user");
//   localStorage.removeItem("token");
// });

// },[]);
  
  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
   if (token) localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
