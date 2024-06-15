import React from "react";
import "./css/registerGroupData.css";

const RegisterGroupData = ({
  name,
  address,
  postalCode,
  city,
  nip,
  handleNameChange,
  handleAddressChange,
  handlePostalCodeChange,
  handleCityChange,
  handleNipChange,
}) => {
  return (
    <div className="registerGroupData">
      <label htmlFor="name">
        Nazwa firmy
        <input type="text" id="name" value={name} onChange={handleNameChange} />
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
      <label htmlFor="nip">
        NIP
        <input type="text" id="nip" value={nip} onChange={handleNipChange} />
      </label>
    </div>
  );
};
export default RegisterGroupData;
