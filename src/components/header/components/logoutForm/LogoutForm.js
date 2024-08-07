import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";

import { StoreContext } from "../../../../StoreProvider";

import { default as LogoutStyles } from "./LogoutForm.module.scss";

const style = BemCssModules(LogoutStyles);

const LogoutForm = () => {
  const { setIsLogged, setIsAdmin, setToken, setValidAt } =
    useContext(StoreContext);
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLogged(false);
    setIsAdmin(false);
    setToken("");
    setValidAt("");
    removeCookie("isLogged", { path: "/" });
    removeCookie("isAdmin", { path: "/" });
    removeCookie("token", { path: "/" });
    removeCookie("isValid", { path: "/" });
    navigate("/");
  };

  return (
    <div className={style()}>
      <form method="POST" onSubmit={handleOnSubmit}>
        <button type="submit">Wyloguj</button>
      </form>
    </div>
  );
};
export default LogoutForm;
