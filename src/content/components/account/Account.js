import React from "react";
import BemCssModules from "bem-css-modules";

import { default as AccountStyle } from "./Account.module.scss";

const style = BemCssModules(AccountStyle);

const Account = ({ isActive, isAdmin, login }) => {
  return (
    <div className={style()}>
      <p>Typ konta: {isAdmin ? "Pracodawca" : "Pracownik"}</p>
      <p>Status konta: {isActive ? "Aktywne" : "Nieaktywne"}</p>
      <p>Login: {login}</p>
    </div>
  );
};
export default Account;
