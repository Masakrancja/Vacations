import React from "react";
import { createContext } from "react";
export const AdminStoreContext = createContext(null);

const AdminStoreProvider = ({ children }) => {
  return <AdminStoreContext.Provider>{children}</AdminStoreContext.Provider>;
};
export default AdminStoreProvider;
