import React from "react";
import BemCssModules from "bem-css-modules";

import { default as AccountStyle } from "./Account.module.scss";

const style = BemCssModules(AccountStyle);

const Account = ({ account, user, group }) => {
  const { isActive, isAdmin, login } = account;
  const { firstName, lastName, address, postalCode, city, phone, email } =
    user.userData;

  return (
    <div className={style()}>
      <p>Typ konta: {isAdmin ? "Pracodawca" : "Pracownik"}</p>
      <p>Status konta: {isActive ? "Aktywne" : "Nieaktywne"}</p>
      <p>Login: {login}</p>
      <h4>Dane adresowe właściciela konta</h4>
      <p>Imię i Nazwisko: {`${firstName} ${lastName}`}</p>
      <p>Adres:</p>
      <p>{address}</p>
      <p>{`${postalCode} ${city}`}</p>
      <p>Telefon: {phone}</p>
      <p>Email: {email}</p>
    </div>
  );
};
export default Account;
