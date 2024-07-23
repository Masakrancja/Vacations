import React, { useState } from "react";
import BemCssModules from "bem-css-modules";

import { default as RegisterPageStyles } from "../RegisterPage.module.scss";

const style = BemCssModules(RegisterPageStyles);

const UserDataForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handlePostalCode = (e) => {
    setPostalCode(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <section>
      <input
        type="text"
        value={firstName}
        onChange={handleFirstName}
        placeholder="Podaj imię"
      />
      <input
        type="text"
        value={lastName}
        onChange={handleLastName}
        placeholder="Podaj nazwisko"
      />
      <input
        type="text"
        value={address}
        onChange={handleAddress}
        placeholder="Podaj adres"
      />
      <input
        type="text"
        value={postalCode}
        onChange={handlePostalCode}
        placeholder="Podaj kod pocztowy"
      />
      <input
        type="text"
        value={city}
        onChange={handleCity}
        placeholder="Podaj miasto"
      />
      <input
        type="text"
        value={phone}
        onChange={handlePhone}
        placeholder="Podaj telefon kontaktowy"
      />
      <input
        type="text"
        value={email}
        onChange={handleEmail}
        placeholder="Podaj email"
      />
    </section>
  );
};
export default UserDataForm;
