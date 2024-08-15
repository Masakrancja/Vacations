import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";
import { StoreContext } from "../../../../../StoreProvider";
import { AdminStoreContext } from "../../AdminStoreProvider";
import { URI } from "../../../../../config";
import User from "../../../components/user/User";
import Error from "../../../components/error/Error";

import { default as UsersStyles } from "./UsersPage.module.scss";

const style = BemCssModules(UsersStyles);

const UsersPage = () => {
  const { token, setToken, setIsLogged, setIsAdmin, setIsValid } =
    useContext(StoreContext);
  const { users, setUsers } = useContext(AdminStoreContext);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      };
      return await fetch(URI + "/users", options);
    })()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code === 401) {
          setIsLogged(false);
          setIsAdmin(false);
          setToken("");
          setIsValid("");
          removeCookie("isLogged", { path: "/" });
          removeCookie("isAdmin", { path: "/" });
          removeCookie("token", { path: "/" });
          removeCookie("isValid", { path: "/" });
          navigate("/");
        }
        if (data.code === 200) {
          setUsers(data.response);
          setError(false);
          setMessage("");
        } else {
          setError(true);
          setMessage(data.message);
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(err.message);
      });
  }, []);

  const usersContent = users
    .filter((user) => Boolean(user.isAdmin) === false)
    .map((user, index) => (
      <div key={index}>
        <User user={user} index={index} />
      </div>
    ));

  return (
    <section className={style()}>
      <h2>Moi pracownicy</h2>
      {error ? <Error message={message} /> : usersContent}
    </section>
  );
};
export default UsersPage;
