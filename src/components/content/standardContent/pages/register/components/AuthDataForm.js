import React, { useContext } from "react";
import BemCssModules from "bem-css-modules";

import { StandardStoreContext } from "../../../StandardStoreProvider";

import { default as RegisterPageStyles } from "../RegisterPage.module.scss";

const style = BemCssModules(RegisterPageStyles);

const AuthDataForm = () => {
  const { login, setLogin, pass, setPass, pass2, setPass2 } =
    useContext(StandardStoreContext);

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const handlePass2Change = (e) => {
    setPass2(e.target.value);
  };

  return (
    <section>
      <input
        type="text"
        value={login}
        onChange={handleLoginChange}
        placeholder="Podaj login"
      />
      <input
        type="password"
        value={pass}
        onChange={handlePassChange}
        placeholder="Podaj hasło"
      />
      <input
        type="password"
        value={pass2}
        onChange={handlePass2Change}
        placeholder="Powtórz hasło"
      />
    </section>
  );
};
export default AuthDataForm;
