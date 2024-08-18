import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";
import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import User from "../../components/user/User";
import Error from "../../components/error/Error";
import Loader from "../../components/loader/Loader";

import { default as UsersPendingStyles } from "./UsersPendingPage.module.scss";

const style = BemCssModules(UsersPendingStyles);

const UsersPendingPage = () => {
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const { token, setToken, setIsLogged, setIsAdmin, setValidAt } =
    useContext(StoreContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

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
        Boolean(user.isAdmin) === false && Boolean(user.isActive) === false
    )
    .map((user) => (
      <div key={user.id}>
        <User user={user} />
      </div>
    ));

  if (loading) {
    return <Loader />;
  }

  return (
    <section className={style()}>
      <h2>Pracownicy oczekujący za zatwierdzenie</h2>
      {error ? <Error message={message} /> : usersContent}
    </section>
  );
};
export default UsersPendingPage;
