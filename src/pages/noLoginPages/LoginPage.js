import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import URI from "../../uri";
import Error from "../../components/Error";

const Login = () => {
  const [loginValue, setLoginValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [message, setMessage] = useState("");
  const [cookie, setCookie] = useCookies(["tokenApi"]);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginValue(e.target.value);
  };
  const handlePassChange = (e) => {
    setPassValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify({ login: loginValue, pass: passValue }),
    };
    fetch(URI + "/auth", options)
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "OK") {
          setMessage("");
          let expires = new Date();
          expires.setTime(expires.getTime() + 60000);
          setCookie("tokenApi", response.response.tokenApi, {
            path: "/",
            expires,
            sameSite: "lax",
          });
          navigate("/events");
          window.location.reload();
        } else {
          setMessage(response.message);
        }
      });
  };

  return (
    <>
      <form method="POST" onSubmit={handleFormSubmit}>
        <label htmlFor="loginValue">Login</label>
        <input
          type="text"
          id="loginValue"
          value={loginValue}
          onChange={handleLoginChange}
          placeholder="Podaj login"
        />

        <label htmlFor="passValue">Hasło</label>
        <input
          type="password"
          id="passValue"
          value={passValue}
          onChange={handlePassChange}
          placeholder="Podaj hasło"
        />
        <button type="submit">Zaloguj</button>
      </form>
      <Error message={message} />
    </>
  );
};
export default Login;
