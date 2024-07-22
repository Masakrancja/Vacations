import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { useCookies } from "react-cookie";
export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [cookies] = useCookies(["token"]);
  const cookieToken = cookies.token || "";
  const cookieIsLogged = Boolean(cookies.isLogged);
  const cookieIsAdmin = Boolean(cookies.isAdmin);
  const [isLogged, setIsLogged] = useState(cookieIsLogged);
  const [isAdmin, setIsAdmin] = useState(cookieIsAdmin);
  const [token, setToken] = useState(cookieToken);

  return (
    <StoreContext.Provider
      value={{
        isLogged,
        setIsLogged,
        isAdmin,
        setIsAdmin,
        token,
        setToken,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export default StoreProvider;
