import React from "react";

import "./css/registerData.css";

const RegisterData = ({
  login,
  pass,
  pass2,
  firstName,
  lastName,
  address,
  postalCode,
  city,
  phone,
  email,
  handleLoginChange,
  handlePassChange,
  handlePass2Change,
  handleFirstNameChange,
  handleLastNameChange,
  handleAddressChange,
  handlePostalCodeChange,
  handleCityChange,
  handlePhoneChange,
  handleEmailChange,
}) => {
  return (
    <div className="registerData">
      <label htmlFor="login">
        Login
        <input
          type="text"
          id="login"
          value={login}
          onChange={handleLoginChange}
        />
      </label>
      <label htmlFor="pass">
        Hasło
        <input
          type="password"
          id="pass"
          value={pass}
          onChange={handlePassChange}
        />
      </label>
      <label htmlFor="pass2">
        Powtórz hasło
        <input
          type="password"
          id="pass2"
          value={pass2}
          onChange={handlePass2Change}
        />
      </label>
      <label htmlFor="firstName">
        Imię
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label htmlFor="lastName">
        Nazwisko
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label htmlFor="address">
        Adres
        <input
          type="text"
          id="address"
          value={address}
          onChange={handleAddressChange}
        />
      </label>
      <label htmlFor="postalCode">
        Kod pocztowy
        <input
          type="text"
          id="postalCode"
          value={postalCode}
          onChange={handlePostalCodeChange}
        />
      </label>
      <label htmlFor="city">
        Miasto
        <input type="text" id="city" value={city} onChange={handleCityChange} />
      </label>
      <label htmlFor="phone">
        Telefon
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
    </div>
  );
};
export default RegisterData;
