import React, { useState } from "react";
import URI from "../../uri";
import Error from "../../components/Error";

const Login = () => {
  const [loginValue, setLoginValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [message, setMessage] = useState("");

  const handleLoginChange = (e) => {
    setLoginValue(e.target.value);
  };
  const handlePassChange = (e) => {
    setPassValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = () => {
    const options = {
      method: "POST",
      body: JSON.stringify({ login: loginValue, pass: passValue }),
    };
    fetch(URI + "/auth", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === "OK") {
            setMessage("");
          //ustawić cookie
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
        <button type="submit" onClick={handleButtonClick}>
          Zaloguj
        </button>
      </form>
      <Error message={message} />
    </>
  );
};
export default Login;
