import React from "react";
import { useState } from "react";
import { createContext } from "react";
export const UserStoreContext = createContext(null);

const UserStoreProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  return (
    <UserStoreContext.Provider
      value={{
        events,
        setEvents,
        event,
        setEvent,
      }}
    >
      {children}
    </UserStoreContext.Provider>
  );
};
export default UserStoreProvider;
