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
      <div className="row mt-4">
        <div className="col-1"></div>
        <div className="col-2">Imię</div>
        <div className="col-2">
          <input
            type="text"
            value={firstName}
            onChange={handleFirstName}
            placeholder="Podaj imię"
          />
        </div>
        <div className="col"></div>
      </div>

      <div className="row mt-1">
        <div className="col-1"></div>
        <div className="col-2">Nazwisko</div>
        <div className="col-2">
          <input
            type="text"
            value={lastName}
            onChange={handleLastName}
            placeholder="Podaj nazwisko"
          />
        </div>
        <div className="col"></div>
      </div>

      <div className="row mt-1">
        <div className="col-1"></div>
        <div className="col-2">Adres</div>
        <div className="col-2">
          <input
            type="text"
            value={address}
            onChange={handleAddress}
            placeholder="Podaj adres"
          />
        </div>
        <div className="col"></div>
      </div>

      <div className="row mt-1">
        <div className="col-1"></div>
        <div className="col-2">Kod pocztowy</div>
        <div className="col-2">
          <input
            type="text"
            value={postalCode}
            onChange={handlePostalCode}
            placeholder="Podaj kod pocztowy"
          />
        </div>
        <div className="col"></div>
      </div>

      <div className="row mt-1">
        <div className="col-1"></div>
        <div className="col-2">Miasto</div>
        <div className="col-2">
          <input
            type="text"
            value={city}
            onChange={handleCity}
            placeholder="Podaj miasto"
          />
        </div>
        <div className="col"></div>
      </div>

      <div className="row mt-1">
        <div className="col-1"></div>
        <div className="col-2">Telefon</div>
        <div className="col-2">
          <input
            type="text"
            value={phone}
            onChange={handlePhone}
            placeholder="Podaj telefon kontaktowy"
          />
        </div>
        <div className="col"></div>
      </div>

      <div className="row mt-1">
        <div className="col-1"></div>
        <div className="col-2">Email</div>
        <div className="col-2">
          <input
            type="text"
            value={email}
            onChange={handleEmail}
            placeholder="Podaj email"
          />
        </div>
        <div className="col"></div>
      </div>
    </>
  );
};
export default UserDataForm;
