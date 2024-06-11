import React from "react";
import Menu from "../components/Menu";

const menuItems = [
  { id: "1", name: "Pokaż pracowników", path: "/users", exact: "false" },
  { id: "2", name: "Wszystkie urlopy", path: "/events", exact: "false" },
  {
    id: "3",
    name: "Urlopy oczekujące",
    path: "/events?status=wait",
    exact: "true",
  },
  {
    id: "4",
    name: "Urlopy zatwierdzone",
    path: "/users?status=approved",
    exact: "false",
  },
  {
    id: "5",
    name: "Urlopy odrzucone",
    path: "/users?status=declined",
    exact: "false",
  },
  { id: "6", name: "Moje konto", path: "/me", exact: "false" },
];

const AdminMenu = () => {
  return <Menu items={menuItems} />;
};
export default AdminMenu;
