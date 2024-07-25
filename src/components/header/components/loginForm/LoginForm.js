import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";

import { StoreContext } from "../../../../StoreProvider";
import { URI } from "../../../../config";
import Error from "../../../content/components/error/Error";

import { default as LoginStyles } from "./LoginForm.module.scss";

const style = BemCssModules(LoginStyles);

const LoginForm = () => {
  const { setIsLogged, setIsAdmin, setToken } = useContext(StoreContext);
  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleLoginChange = (e) => setLogin(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    (async () => {
      const options = {
        method: "POST",
        body: JSON.stringify({
          login,
          pass: password,
        }),
      };
      return await fetch(URI + "/auth", options);
    })()
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.code === 201) {
          const { isAdmin, tokenApi } = data.response;
          setIsLogged(true);
          setIsAdmin(Boolean(isAdmin));
          setToken(tokenApi);
          setCookie("token", tokenApi, {
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
          setCookie("isAdmin", Boolean(isAdmin), {
            path: "/",
            maxAge: 3660,
            secure: true,
            sameSite: "none",
          });
          navigate("/");
        } else {
          setError(true);
          setMessage(data.message);
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(err.message);
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
      {error ? <Error message={message} /> : null}
    </div>
  );
};
export default LoginForm;
