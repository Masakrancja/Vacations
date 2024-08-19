import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";

import { StoreContext } from "../../../../StoreProvider";

import { URI } from "../../../../config";
import Error from "../../error/Error";

import { default as LoaderStyles } from "../../../../Loader.module.scss";
const styleLoader = BemCssModules(LoaderStyles);

const EventDelete = ({ event, setEvent }) => {
  const { token, setToken, setIsLogged, setIsAdmin, setValidAt } =
    useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const { id } = event;
  useEffect(() => {
    (async () => {
      try {
        const options = {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        const response = await fetch(URI + "/events/" + id, options);
        const data = await response.json();
        if (data.status === "OK") {
          setError(false);
          setMessage("Poprawnie usunięto urlop");
          setEvent(null);
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
      {error ? <Error message={message} /> : null}
    </>
  );
};
export default EventDelete;
