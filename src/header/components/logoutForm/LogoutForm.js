import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";

import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";

import { default as LoaderStyles } from "../../../Loader.module.scss";

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
          setIsActive(data.response.isActive);
        } else {
          setError(true);
          setMessage(data.message);
        }

        const { id } = data.response;
        response = await fetch(URI + "/users/" + id, options);
        data = await response.json();

        if (data.status === "OK") {
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
    <>
      {loading ? <div className={styleLoader()}></div> : null}
      <form className="h-100" method="POST" onSubmit={handleOnSubmit}>
        <div className="row h-100">
          <div className="col-9 h-100 d-flex align-items-center">
            <div className="p-2">
              <div>
                Witaj, <span className="fw-bold">{fullName}</span>
              </div>
              <div>
                Typ konta:{" "}
                <span className="fw-bold">
                  {isAdmin ? "Właściciel" : "Pracownik"}
                </span>
              </div>
              <div>
                Status konta:{" "}
                <span
                  className={
                    isActive ? "text-success fw-bold" : "text-danger fw-bold"
                  }
                >
                  {isActive ? "Aktywne" : "Nieaktywne"}
                </span>
              </div>
            </div>
          </div>
          <div className="col-3 h-100 d-flex align-items-center">
            <button className="btn btn-outline-primary" type="submit">
              Wyloguj
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default LogoutForm;
