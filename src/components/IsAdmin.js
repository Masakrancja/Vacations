import React from "react";
const IsAdmin = ({ change }) => {
  return (
    <div>
      <label htmlFor="isUser">
        Pracownik
        <input
          type="radio"
          name="userType"
          id="isUser"
          onChange={change}
          defaultChecked
        />
      </label>
      <label htmlFor="isAdmin">
        Właściciel
        <input type="radio" name="userType" id="isAdmin" onChange={change} />
      </label>
    </div>
  );
};
export default IsAdmin;
