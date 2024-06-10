import React from "react";
import Button from "../helpers/Button";

import "./adminMenu.css";

const AdminMenu = () => {
  return (
    <div className="adminMenu">
      <Button name="Pokaż pracowników" />
      <Button name="Pokaż urlopy pracowników" />
      <Button name="Urlopy oczekujące" />
      <Button name="Urlopy zatwierdzone" />
      <Button name="Urlopy odrzucone" />
      <Button name="Moje konto" />
    </div>
  );
};
export default AdminMenu;
