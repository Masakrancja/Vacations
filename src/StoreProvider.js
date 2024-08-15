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
  const cookieValidAt = cookies.validAt;
  const [isLogged, setIsLogged] = useState(cookieIsLogged);
  const [isAdmin, setIsAdmin] = useState(cookieIsAdmin);
  const [token, setToken] = useState(cookieToken);
  const [validAt, setValidAt] = useState(cookieValidAt);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [isEventWasCanceled, setIsEventWasCanceled] = useState(false);

  return (
    <StoreContext.Provider
      value={{
        isLogged,
        setIsLogged,
        isAdmin,
        setIsAdmin,
        token,
        setToken,
        validAt,
        setValidAt,
        users,
        setUsers,
        userId,
        setUserId,
        events,
        setEvents,
        event,
        setEvent,
        isEventWasCanceled,
        setIsEventWasCanceled,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export default StoreProvider;
