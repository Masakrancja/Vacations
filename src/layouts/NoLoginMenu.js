import React from "react";
import Menu from "../components/Menu";

const menuItems = [
  { id: "1", name: "Zaloguj", path: "/login", exact: "true" },
  { id: "2", name: "Rejestracja", path: "/register", exact: "false" },
  { id: "3", name: "Dostępne firmy", path: "/groups", exact: "false" },
];

const NoLoginMenu = () => {
  return <Menu items={menuItems} />;
};
export default NoLoginMenu;
