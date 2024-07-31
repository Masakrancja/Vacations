import React, { useState } from "react";
import { createContext } from "react";
export const AdminStoreContext = createContext(null);

const AdminStoreProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  return (
    <AdminStoreContext.Provider
      value={{
        users,
        setUsers,
      }}
    >
      {children}
    </AdminStoreContext.Provider>
  );
};
export default AdminStoreProvider;
