import React, { useContext } from "react";
import BemCssModules from "bem-css-modules";

import { StoreContext } from "../StoreProvider";
import LoginForm from "./components/loginForm/LoginForm";
import LogoutForm from "./components/logoutForm/LogoutForm";

import { default as HeaderStyles } from "./Header.module.scss";
import logo from "./logo_vacations.png";

const style = BemCssModules(HeaderStyles);

const Header = () => {
  const { isLogged } = useContext(StoreContext);

  const toggleLoginLogoutForm = isLogged ? <LogoutForm /> : <LoginForm />;

  return (
    <header className={style()}>
      <div className={style("logo-box")}>
        <img className={style("logo-img")} src={logo} alt="logo" />
      </div>
      <h1 className={style("title-box")}>Urlopy</h1>
      <div className={style("auth-box")}>{toggleLoginLogoutForm}</div>
    </header>
  );
};
export default Header;
