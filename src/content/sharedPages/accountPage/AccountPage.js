import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";
import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import Account from "../../components/account/Account";
import Error from "../../components/error/Error";

import { default as AccountStyles } from "./AccountPage.module.scss";

const style = BemCssModules(AccountStyles);

const AccountPage = () => {
  const { token, setToken, setIsLogged, setIsAdmin, setIsValid } =
    useContext(StoreContext);
  const [account, setAccount] = useState(null);
  const [user, setUser] = useState(null);
  const [group, setGroup] = useState(null);
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
      return await fetch(URI + "/auth", options);
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
          console.log(data.response);
          setAccount(data.response);
          setError(false);
          setMessage("");

          //Pobranie danych usera
          (async () => {
            const { id } = data.response;
            const options = {
              method: "GET",
              headers: { Authorization: "Bearer " + token },
            };
            return await fetch(URI + "/users/" + id, options);
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
                console.log(data.response);
                setUser(data.response);
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

          //Pobranie danych grupy
          (async () => {
            const { groupId } = data.response;
            const options = {
              method: "GET",
              headers: { Authorization: "Bearer " + token },
            };
            return await fetch(URI + "/groups/" + groupId, options);
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
                console.log(data.response);
                setGroup(data.response);
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

  return (
    <section className={style()}>
      <h2>Moje konto</h2>
      {error ? <Error message={message} /> : <Account {...account} />}
    </section>
  );
};
export default AccountPage;
