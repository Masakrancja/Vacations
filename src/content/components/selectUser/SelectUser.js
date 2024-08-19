import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";

import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import Error from "../error/Error";

import { default as SelectUserStyle } from "./SelectUser.module.scss";
import { default as LoaderStyles } from "../../../Loader.module.scss";

const style = BemCssModules(SelectUserStyle);
const styleLoader = BemCssModules(LoaderStyles);

const SelectUser = () => {
  const { token, setUserId, setToken, setIsLogged, setIsAdmin, setValidAt } =
    useContext(StoreContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const options = {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        };
        const response = await fetch(URI + "/users", options);
        const data = await response.json();
        if (data.status === "OK") {
          setUsers(data.response);
          setError(false);
          setMessage("");
        } else {
          if (data.code === 401) {
            setIsLogged(false);
            setIsAdmin(false);
            setToken("");
            setValidAt("");
            removeCookie("isLogged", { path: "/" });
            removeCookie("isAdmin", { path: "/" });
            removeCookie("token", { path: "/" });
            removeCookie("validAt", { path: "/" });
            navigate("/");
          } else {
            setError(true);
            setMessage(data.message);
          }
        }
      } catch (error) {
        setError(true);
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const usersContent = users
    .filter(
      (user) =>
        Boolean(user.isAdmin) === false && Boolean(user.isActive) === true
    )
    .map((user) => (
      <option key={user.id} value={user.id}>
        {user.login}
      </option>
    ));

  const handleOnChange = (e) => {
    setUserId(Number(e.target.value));
  };

  return (
    <>
      {loading ? <div className={styleLoader()}></div> : null}
      <section className={style()}>
        <h3>Wybierz pracownika z listy</h3>
        <select onChange={handleOnChange}>
          <option>Wszyscy pracownicy</option>
          {usersContent}
        </select>
        {error ? <Error message={message} /> : null}
      </section>
    </>
  );
};
export default SelectUser;
