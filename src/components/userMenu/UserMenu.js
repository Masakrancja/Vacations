import React from "react";
import Button from "../helpers/Button";

import "./userMenu.css";

const UserMenu = () => {
  return (
    <div className="userMenu">
      <Button name="Dodaj urlop" />
      <Button name="Moje urlopy" />
      <Button name="Urlopy oczekujące" />
      <Button name="Urlopy zatwierdzone" />
      <Button name="Urlopy odrzucone" />
      <Button name="Moje konto" />
    </div>
  );
};
export default UserMenu;
