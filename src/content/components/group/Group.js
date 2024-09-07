import React from "react";

const Group = ({ name, nip, city }) => {
  return (
    <div className="col mb-2">
      <div className="card border-primary" style={{ maxWidth: "18rem" }}>
        <div className="card-header">{name}</div>
        <div className="card-body">
          <h5 className="card-title">NIP: {nip}</h5>
          <p className="card-text">Miasto: {city}</p>
        </div>
      </div>
    </div>
  );
};
export default Group;
