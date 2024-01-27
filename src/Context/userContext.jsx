import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const storedAuthData = localStorage.getItem("authData");
  const initialAuth = storedAuthData ? JSON.parse(storedAuthData) : null;
  const token = initialAuth?.token;
  const [auth, setAuth] = useState(initialAuth);

  return (
    <AuthContext.Provider value={{ auth, setAuth, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
