import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import BemCssModules from "bem-css-modules";

import { StoreContext } from "../../../../StoreProvider";

import { default as LoginStyles } from "./LoginForm.module.scss";

const style = BemCssModules(LoginStyles);

const LoginForm = () => {
  const { setIsLogged, setIsAdmin, setToken } = useContext(StoreContext);
  const [, setCookie] = useCookies(["token"]);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = (e) => setLogin(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLogged(true);
    setIsAdmin(false);
    setToken("dfdsfSDdcZxcZcZDvS");
    setCookie("token", "dfdsfSDdcZxcZcZDvS", {
      path: "/",
      maxAge: 3660,
      secure: true,
      sameSite: "none",
    });
    setCookie("isLogged", true, {
      path: "/",
      maxAge: 3600,
      secure: true,
      sameSite: "none",
    });
    setCookie("isAdmin", false, {
      path: "/",
      maxAge: 3660,
      secure: true,
      sameSite: "none",
    });
  };
  return (
    <div className={style()}>
      <form method="POST" onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={login}
          onChange={handleLoginChange}
          placeholder="Podaj login"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Podaj hasło"
        />
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
};
export default LoginForm;
