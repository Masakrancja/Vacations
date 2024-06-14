import { createContext } from "react";

export const dataRegisterContext = {
  login: "",
  pass: "",
  pass2: "",
  isAdmin: false,
  groupId: null,
  userData: {
    firstName: "",
    lastName: "",
    postalCode: "",
    city: "",
    phone: "",
    email: "",
  },
  group: {
    name: "",
    address: "",
    postalCode: "",
    city: "",
    nip: "",
  },
};

export const RegisterContext = createContext(dataRegisterContext);
