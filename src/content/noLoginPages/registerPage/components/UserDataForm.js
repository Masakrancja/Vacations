import React, { useContext } from "react";

import { NoLoginStoreContext } from "../../NoLoginStoreProvider";

const UserDataForm = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    address,
    setAddress,
    postalCode,
    setPostalCode,
    city,
    setCity,
    phone,
    setPhone,
    email,
    setEmail,
  } = useContext(NoLoginStoreContext);

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
    <>
      <h5 className="mt-3">Dane użytkownika</h5>
      <div className="row mt-4">
        <div className="col-3">Imię</div>
        <div className="col-9">
          <input
            type="text"
            className="form-control"
            value={firstName}
            onChange={handleFirstName}
            placeholder="Podaj imię"
          />
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-3">Nazwisko</div>
        <div className="col-9">
          <input
            type="text"
            className="form-control"
            value={lastName}
            onChange={handleLastName}
            placeholder="Podaj nazwisko"
          />
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-3">Adres</div>
        <div className="col-9">
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={handleAddress}
            placeholder="Podaj adres"
          />
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-3">Kod pocztowy</div>
        <div className="col-9">
          <input
            type="text"
            className="form-control"
            value={postalCode}
            onChange={handlePostalCode}
            placeholder="Podaj kod pocztowy"
          />
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-3">Miasto</div>
        <div className="col-9">
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={handleCity}
            placeholder="Podaj miasto"
          />
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-3">Telefon</div>
        <div className="col-9">
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={handlePhone}
            placeholder="Podaj telefon kontaktowy"
          />
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-3">Email</div>
        <div className="col-md-9">
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={handleEmail}
            placeholder="Podaj email"
          />
        </div>
      </div>
    </>
  );
};
export default UserDataForm;
