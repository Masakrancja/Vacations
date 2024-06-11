import React from "react";
import Menu from "../components/Menu";

const menuItems = [
  { id: "1", name: "Pokaż pracowników", path: "/users", exact: "false" },
  { id: "2", name: "Wszystkie urlopy", path: "/events", exact: "false" },
  {
    id: "3",
    name: "Urlopy oczekujące",
    path: "/events/waiting",
    exact: "true",
  },
  {
    id: "4",
    name: "Urlopy zatwierdzone",
    path: "/events/approved",
    exact: "false",
  },
  {
    id: "5",
    name: "Urlopy odrzucone",
    path: "/events/rejected",
    exact: "false",
  },
  { id: "6", name: "Moje konto", path: "/me", exact: "false" },
  { id: "7", name: "Wyloguj", path: "/logout", exact: "false" },
];

const AdminMenu = () => {
  return <Menu items={menuItems} />;
};
export default AdminMenu;
