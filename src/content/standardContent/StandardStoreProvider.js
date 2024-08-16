import React from "react";
import { useState } from "react";
import { createContext } from "react";
export const StandardStoreContext = createContext(null);

const StandardStoreProvider = ({ children }) => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [groupId, setGroupId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupAddress, setGroupAddress] = useState("");
  const [groupPostalCode, setGroupPostalCode] = useState("");
  const [groupCity, setGroupCity] = useState("");
  const [groupNip, setGroupNip] = useState("");
  const [userType, setUserType] = useState("user");

  return (
    <StandardStoreContext.Provider
      value={{
        login,
        setLogin,
        pass,
        setPass,
        pass2,
        setPass2,
        groupId,
        setGroupId,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        address,
        setAddress,
        postalCode,
        setPostalCode,
        city,
        setCity,
        phone,
        setPhone,
        email,
        setEmail,
        groupName,
        setGroupName,
        groupAddress,
        setGroupAddress,
        groupPostalCode,
        setGroupPostalCode,
        groupCity,
        setGroupCity,
        groupNip,
        setGroupNip,
        userType,
        setUserType,
      }}
    >
      {children}
    </StandardStoreContext.Provider>
  );
};
export default StandardStoreProvider;
