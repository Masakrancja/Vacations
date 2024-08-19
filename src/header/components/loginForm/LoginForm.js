import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";

import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import Error from "../../../content/components/error/Error";

import { default as LoginStyles } from "./LoginForm.module.scss";
import { default as LoaderStyles } from "../../../Loader.module.scss";

const style = BemCssModules(LoginStyles);
const styleLoader = BemCssModules(LoaderStyles);

const LoginForm = () => {
  const { setIsLogged, setIsAdmin, setToken, setValidAt } =
    useContext(StoreContext);
  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleLoginChange = (e) => setLogin(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setLoading(true);
    (async () => {
      try {
        const options = {
          method: "POST",
          body: JSON.stringify({
            login,
            pass: password,
          }),
        };
        const response = await fetch(URI + "/auth", options);
        const data = await response.json();
        if (data.status === "OK") {
          const { isAdmin, token, validAt } = data.response;
          setIsLogged(true);
          setIsAdmin(Boolean(isAdmin));
          setToken(token);
          setValidAt(validAt);
          setCookie("token", token, {
            path: "/",
            maxAge: 3600,
            secure: true,
            sameSite: "none",
          });
          setCookie("isLogged", true, {
            path: "/",
            maxAge: 3600,
            secure: true,
            sameSite: "none",
          });
          setCookie("isAdmin", Boolean(isAdmin), {
            path: "/",
            maxAge: 3600,
            secure: true,
            sameSite: "none",
          });
          setCookie("validAt", validAt, {
            path: "/",
            maxAge: 3600,
            secure: true,
            sameSite: "none",
          });
          navigate("/");
        } else {
          setError(true);
          setMessage(data.message);
        }
      } catch (error) {
        setError(true);
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <div className={style()}>
      {loading ? <div className={styleLoader()}></div> : null}
      <form method="POST" onSubmit={handleOnSubmit}>
        <div className={style("div-wrapper")}>
          <div className={style("div-input")}>
            <input
              className={style("input")}
              type="text"
              value={login}
              onChange={handleLoginChange}
              placeholder="Podaj login"
            />
            <input
              className={style("input")}
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Podaj hasło"
            />
          </div>
          <div className={style("div-button")}>
            <button className={style("btn")} type="submit">
              Zaloguj
            </button>
          </div>
        </div>
      </form>
      {error ? <Error message={message} /> : null}
    </div>
  );
};
export default LoginForm;