import React, { useState } from "react";
import { createContext } from "react";
export const AdminStoreContext = createContext(null);

const AdminStoreProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [events, setEvents] = useState([]);
  return (
    <AdminStoreContext.Provider
      value={{
        users,
        setUsers,
        userId,
        setUserId,
        events,
        setEvents,
      }}
    >
      {children}
    </AdminStoreContext.Provider>
  );
};
export default AdminStoreProvider;
