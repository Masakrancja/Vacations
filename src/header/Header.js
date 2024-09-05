import React, { useContext } from "react";

import { StoreContext } from "../StoreProvider";
import LoginForm from "./components/loginForm/LoginForm";
import LogoutForm from "./components/logoutForm/LogoutForm";

import logo from "./logo_vacations.png";

const Header = () => {
  const { isLogged } = useContext(StoreContext);

  const toggleLoginLogoutForm = isLogged ? <LogoutForm /> : <LoginForm />;

  return (
    <header
      style={{ height: "100px" }}
      className="w-100 sticky-top bg-primary-subtle"
    >
      <div className="row h-100">
        <div className="col-1"></div>
        <div className="col-2 h-100 d-flex justify-content-center align-items-center">
          <img src={logo} style={{ height: "90px" }} alt="logo" />
        </div>
        <div className="col-1"></div>
        <div className="col-4 h-100 d-flex justify-content-center align-items-center">
          <h1>Urlopy</h1>
        </div>
        <div className="col-4 h-100">{toggleLoginLogoutForm}</div>
      </div>
    </header>
  );
};
export default Header;
