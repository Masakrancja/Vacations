import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";

import { StoreContext } from "../../../../StoreProvider";
import { URI } from "../../../../config";
import Error from "../../error/Error";
import Success from "../../success/Success";

import { default as LoaderStyles } from "../../../../Loader.module.scss";

const styleLoader = BemCssModules(LoaderStyles);

const EventCancelAdmin = ({ event, setEvent }) => {
  const {
    token,
    setToken,
    setIsLogged,
    setIsAdmin,
    setValidAt,
    setIsEventWasCanceled,
  } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const { id, wantCancel } = event;

  const handleOnClik = () => {
    setLoading(true);
    (async () => {
      try {
        const options = {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            status: "cancelled",
          }),
        };
        const response = await fetch(URI + "/events/" + id, options);
        const data = await response.json();
        if (data.status === "OK") {
          setError(false);
          setMessage("Urlop został anulowany");
          setEvent((prevEvent) => ({
            ...prevEvent,
            wantCancel: "no",
            status: "cancelled",
          }));
          setIsEventWasCanceled(true);
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
  };

  return (
    <>
      {loading ? <div className={styleLoader()}></div> : null}
      <h6>Pracownik wysłał prośbę o anulowanie urlopu</h6>
      {wantCancel ? <button onClick={handleOnClik}>Anuluj urlop</button> : null}
      {error ? <Error message={message} /> : <Success message={message} />}
    </>
  );
};
export default EventCancelAdmin;
