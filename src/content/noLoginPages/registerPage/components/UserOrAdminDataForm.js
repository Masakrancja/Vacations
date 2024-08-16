import React, { useContext } from "react";
import BemCssModules from "bem-css-modules";

import { NoLoginStoreContext } from "../../NoLoginStoreProvider";

import { default as RegisterPageStyles } from "../RegisterPage.module.scss";

const style = BemCssModules(RegisterPageStyles);

const UserOrAdminDataForm = () => {
  const { userType, setUserType } = useContext(NoLoginStoreContext);
  const handleChange = (e) => setUserType(e.target.id);
  const checkedUser = userType === "user" ? "checked" : null;
  const checkedAdmin = userType === "admin" ? "checked" : null;

  return (
    <section className={style()}>
      <label htmlFor="user">Jestem pracownikiem</label>
      <input
        type="radio"
        name="client"
        id="user"
        onChange={handleChange}
        defaultChecked={checkedUser}
      />
      <label htmlFor="admin">Jestem pracodawcą</label>
      <input
        type="radio"
        name="client"
        id="admin"
        onChange={handleChange}
        defaultChecked={checkedAdmin}
      />
    </section>
  );
};
export default UserOrAdminDataForm;
