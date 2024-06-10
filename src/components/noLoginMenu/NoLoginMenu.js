import React from "react";
import "./noLoginMenu.css";
import Button from "../helpers/Button";

const NoLoginMenu = () => {
  return (
    <div className="noLoginMenu">
      <Button name="Zaloguj" />
      <Button name="Rejestracja" />
      <Button name="Dostępne firmy" />
    </div>
  );
};
export default NoLoginMenu;
