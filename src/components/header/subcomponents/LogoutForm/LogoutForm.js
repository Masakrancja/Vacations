import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import BemCssModules from "bem-css-modules";

import { StoreContext } from "../../../../StoreProvider";

import { default as LogoutStyles } from "./LogoutForm.module.scss";

const style = BemCssModules(LogoutStyles);

const LogoutForm = () => {
  const { setIsLogged, setIsAdmin, setToken } = useContext(StoreContext);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("Wylogowywanie...");
    setIsLogged(false);
    setIsAdmin(false);
    setToken("");
    removeCookie("isLogged", { path: "/" });
    removeCookie("isAdmin", { path: "/" });
    removeCookie("token", { path: "/" });
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
