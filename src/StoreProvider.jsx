import React from "react";
import { useState } from 'react';
import { createContext, } from 'react';

export const StoreContext = createContext(null);

const StoreProvider = ({children}) => {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState('');
  return (
    <StoreContext.Provider value={{
      isLogged, setIsLogged, token, setToken
    }}>
      {children}
    </StoreContext.Provider>
  )
}
export default StoreProvider;