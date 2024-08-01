import React, { useState } from "react";
import { createContext } from "react";
export const AdminStoreContext = createContext(null);

const AdminStoreProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  return (
    <AdminStoreContext.Provider
      value={{
        users,
        setUsers,
        userId,
        setUserId,
      }}
    >
      {children}
    </AdminStoreContext.Provider>
  );
};
export default AdminStoreProvider;
