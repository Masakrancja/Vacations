import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";

import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";

import { default as LogoutStyles } from "./LogoutForm.module.scss";
import { default as LoaderStyles } from "../../../Loader.module.scss";

const style = BemCssModules(LogoutStyles);
const styleLoader = BemCssModules(LoaderStyles);

const LogoutForm = () => {
  const { token, isAdmin, setIsLogged, setIsAdmin, setToken, setValidAt } =
    useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const options = {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        };
        let response = await fetch(URI + "/auth", options);
        let data = await response.json();

        if (data.status === "OK") {
          console.log(data.response);
          setIsActive(data.response.isActive);
        } else {
          setError(true);
          setMessage(data.message);
        }

        const { id } = data.response;
        response = await fetch(URI + "/users/" + id, options);
        data = await response.json();

        if (data.status === "OK") {
          console.log(data.response);
          const { firstName, lastName } = data.response.userData;
          setFullName(`${firstName} ${lastName}`);
        } else {
          setError(true);
          setMessage(data.message);
        }
      } catch (error) {
        setError(true);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsLogged(false);
    setIsAdmin(false);
    setToken("");
    setValidAt("");
    removeCookie("isLogged", { path: "/" });
    removeCookie("isAdmin", { path: "/" });
    removeCookie("token", { path: "/" });
    removeCookie("validAt", { path: "/" });
    navigate("/");
  };

  return (
    <div className={style()}>
      {loading ? <div className={styleLoader()}></div> : null}
      <form method="POST" onSubmit={handleOnSubmit}>
        <div className={style("div-wrapper")}>
          <div className={style("div-content")}>
            <div className={"div-fullname"}>
              Witaj, <span className={style("bold")}>{fullName}</span>
            </div>
            <div>
              Typ konta:{" "}
              <span className={style("bold")}>
                {isAdmin ? "Właściciel" : "Pracownik"}
              </span>
            </div>
            <div>
              Status konta:{" "}
              <span className={style(isActive ? "active" : "inactive")}>
                {isActive ? "Aktywne" : "Nieaktywne"}
              </span>
            </div>
          </div>
          <div className={style("div-btn")}>
            <button className={style("btn")} type="submit">
              Wyloguj
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default LogoutForm;