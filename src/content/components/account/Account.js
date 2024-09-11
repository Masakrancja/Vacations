import React from "react";
import UserInfo from "../userInfo/UserInfo";

const Account = ({ account, user, group }) => {
  const { isActive, isAdmin, login } = account;

  return (
    <div className="card border-primary mb-3" style={{ maxWidth: "18rem" }}>
      <div className="card-header">Dane podstawowe</div>
      <div className="card-body">
        <p className="card-text">
          Typ konta:{" "}
          <span className="fw-bold">
            {isAdmin ? "Pracodawca" : "Pracownik"}
          </span>
        </p>
        <p className="card-text">
          Status konta:{" "}
          <span className="fw-bold">{isActive ? "Aktywne" : "Nieaktywne"}</span>
        </p>
        <p className="card-text">
          Login: <span className="fw-bold">{login}</span>
        </p>
      </div>
      <div className="card-header">Dane adresowe właściciela konta</div>
      <div className="card-body">
        <UserInfo {...user.userData} />
        {/* <p className="card-text">{`${firstName} ${lastName}`}</p>
        <p className="card-text">Adres:</p>
        <p className="card-text">{address}</p>
        <p className="card-text">{`${postalCode} ${city}`}</p>
        <p className="card-text">Telefon: {phone}</p>
        <p className="card-text">Email: {email}</p> */}
      </div>
    </div>
  );
};
export default Account;
