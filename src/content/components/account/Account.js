import React from "react";

const Account = ({ account, user, group }) => {
  const { isActive, isAdmin, login } = account;
  const { firstName, lastName, address, postalCode, city, phone, email } =
    user.userData;

  return (
    <div className="card border-primary mb-3" style={{ maxWidth: "18rem" }}>
      <div className="card-header">Dane podstawowe</div>
      <div className="card-body">
        <p className="card-text">
          Typ konta: {isAdmin ? "Pracodawca" : "Pracownik"}
        </p>
        <p className="card-text">
          Status konta: {isActive ? "Aktywne" : "Nieaktywne"}
        </p>
        <p className="card-text">Login: {login}</p>
      </div>
      <div className="card-header">Dane adresowe właściciela konta</div>
      <div className="card-body">
        <p className="card-text">
          Imię i Nazwisko: {`${firstName} ${lastName}`}
        </p>
        <p className="card-text">Adres:</p>
        <p className="card-text">{address}</p>
        <p className="card-text">{`${postalCode} ${city}`}</p>
        <p className="card-text">Telefon: {phone}</p>
        <p className="card-text">Email: {email}</p>
      </div>
    </div>
  );
};
export default Account;
