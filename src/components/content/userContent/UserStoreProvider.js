import React from "react";
import { useState } from "react";
import { createContext } from "react";
export const UserStoreContext = createContext(null);

const UserStoreProvider = ({ children }) => {
  const today = new Date().toISOString().substring(0, 10);
  const [reasonId, setReasonId] = useState(null);
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);
  const [notice, setNotice] = useState("");
  return (
    <UserStoreContext.Provider
      value={{
        reasonId,
        setReasonId,
        dateFrom,
        setDateFrom,
        dateTo,
        setDateTo,
        notice,
        setNotice,
      }}
    >
      {children}
    </UserStoreContext.Provider>
  );
};
export default UserStoreProvider;
