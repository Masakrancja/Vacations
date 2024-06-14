import { useState } from "react";
import { dataRegisterContext } from "../context/RegisterContext";

import "./css/registerData.css";

const RegisterData = () => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
    dataRegisterContext.login = login;
  };
  const handlePassChange = (e) => {
    setPass(e.target.value);
    dataRegisterContext.pass = pass;
  };
  const handlePass2Change = (e) => {
    setPass2(e.target.value);
    dataRegisterContext.pass2 = pass2;
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    dataRegisterContext.userData.firstName = firstName;
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    dataRegisterContext.userData.lastName = lastName;
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    dataRegisterContext.userData.address = address;
  };
  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
    dataRegisterContext.userData.postalCode = postalCode;
  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
    dataRegisterContext.userData.city = city;
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    dataRegisterContext.userData.phone = phone;
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    dataRegisterContext.userData.email = email;
  };

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
