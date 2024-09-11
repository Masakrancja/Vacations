import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";
import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import Account from "../../components/account/Account";
import Error from "../../components/error/Error";

import { default as LoaderStyles } from "../../../Loader.module.scss";

const styleLoader = BemCssModules(LoaderStyles);

const AccountPage = () => {
  const { token, setToken, setIsLogged, setIsAdmin, setValidAt } =
    useContext(StoreContext);
  const [account, setAccount] = useState(null);
  const [user, setUser] = useState(null);
  const [group, setGroup] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
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
        let response = await fetch(URI + "/auth", options);
        let data = await response.json();
        if (data.status === "OK") {
          setAccount(data.response);
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

        const { id, groupId } = data.response;

        response = await fetch(URI + "/users/" + id, options);
        data = await response.json();
        if (data.status === "OK") {
          setUser(data.response);
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

        response = await fetch(URI + "/groups/" + groupId, options);
        data = await response.json();
        if (data.status === "OK") {
          setGroup(data.response);
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

  return (
    <>
      {loading ? <div className={styleLoader()}></div> : null}
      <h2>Moje konto</h2>
      {error ? (
        <Error message={message} />
      ) : (
        <>
          {account && user && group ? (
            <Account account={account} user={user} group={group} />
          ) : null}
        </>
      )}
    </>
  );
};
export default AccountPage;
