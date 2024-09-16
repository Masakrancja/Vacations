import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import Error from "../../../content/components/error/Error";
import Loader from "../../../content/components/loader/Loader";

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
          setMessage("Niepoprawne dane logowania. Spróbuj ponownie");
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
    <>
      <form className="h-100" method="POST" onSubmit={handleOnSubmit}>
        <div className="row h-100">
          <div className="col-3"></div>
          <div className="col-6 h-100 d-flex align-items-center">
            <div>
              <input
                className="form-control"
                type="text"
                value={login}
                onChange={handleLoginChange}
                placeholder="Podaj login"
              />
              <input
                className="form-control mt-1"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Podaj hasło"
              />
            </div>
          </div>

          <div className="col-3 h-100 d-flex align-items-center">
            <button className="btn btn-outline-primary" type="submit">
              Zaloguj
            </button>
          </div>
        </div>
      </form>
      {error ? <Error message={message} /> : null}
      {loading ? <Loader /> : null}
    </>
  );
};
export default LoginForm;
