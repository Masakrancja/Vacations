import React, { useState } from "react";
import BemCssModules from "bem-css-modules";

import { default as RegisterPageStyles } from "../RegisterPage.module.scss";

const style = BemCssModules(RegisterPageStyles);

const AuthDataForm = () => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");

  const handleLoginChange = (e) => {
    setLogin(e.taget.value);
  };

  const handlePassChange = (e) => {
    setLogin(e.taget.value);
  };

  const handlePass2Change = (e) => {
    setLogin(e.taget.value);
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
