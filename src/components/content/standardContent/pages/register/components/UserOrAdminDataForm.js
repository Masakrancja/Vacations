import React, { useState } from "react";
import BemCssModules from "bem-css-modules";

import { default as RegisterPageStyles } from "../RegisterPage.module.scss";

const style = BemCssModules(RegisterPageStyles);

const UserOrAdminDataForm = ({ userType, setUserType }) => {
  const handleChange = (e) => setUserType(e.target.id);

  return (
    <section>
      <label htmlFor="user">Jestem pracownikiem</label>
      <input type="radio" name="client" id="user" onChange={handleChange} />
      <label htmlFor="admin">Jestem pracodawcą</label>
      <input type="radio" name="client" id="admin" onChange={handleChange} />
    </section>
  );
};
export default UserOrAdminDataForm;
