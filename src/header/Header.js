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
      className="w-100 sticky-top bg-light text-center"
    >
      <div className="row h-100">
        <div className="col-xl-1 d-none d-xl-block"></div>
        <div className="col-xl-2 d-none d-xl-block h-100 d-xl-flex justify-content-center align-items-center">
          <img src={logo} style={{ height: "90px" }} alt="logo" />
        </div>
        <div className="col-xl-1 d-none d-xl-block"></div>
        <div className="col-xl-4 d-none d-xl-block h-100 d-xl-flex justify-content-center align-items-center">
          <h1>Urlopy</h1>
        </div>
        <div className="col-xl-4 col-md-12 h-100">{toggleLoginLogoutForm}</div>
      </div>
    </header>
  );
};
export default Header;
