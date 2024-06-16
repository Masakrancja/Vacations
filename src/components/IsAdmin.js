import React from "react";
const IsAdmin = ({ isAdmin, handleChecked }) => {
  return (
    <div>
      <label htmlFor="isUser">
        Pracownik
        <input
          type="radio"
          name="userType"
          id="isUser"
          defaultChecked={true}
          onChange={handleChecked}
        />
      </label>
      <label htmlFor="isAdmin">
        Właściciel
        <input
          type="radio"
          name="userType"
          id="isAdmin"
          checked={isAdmin}
          onChange={handleChecked}
        />
      </label>
    </div>
  );
};
export default IsAdmin;
