import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";
import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import SelectUser from "../../components/selectUser/SelectUser";
import Event from "../../components/event/Event";
import Error from "../../components/error/Error";

import { default as UsersStyles } from "./EventsPetitionsPage.module.scss";
import { default as LoaderStyles } from "../../../Loader.module.scss";

const style = BemCssModules(UsersStyles);
const styleLoader = BemCssModules(LoaderStyles);

const EventsPetitionsPage = () => {
  const {
    token,
    setToken,
    setIsLogged,
    setIsAdmin,
    setValidAt,
    userId,
    isEventWasCanceled,
  } = useContext(StoreContext);
  const [events, setEvents] = useState([]);
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
        let response;
        if (userId) {
          response = await fetch(URI + "/events?userid=" + userId, options);
        } else {
          response = await fetch(URI + "/events", options);
        }
        const data = await response.json();
        if (data.status === "OK") {
          setEvents(data.response);
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
  }, [userId, isEventWasCanceled]);

  const eventContent = events
    .filter((event) => event.wantCancel === "yes")
    .map((event) => (
      <div key={event.id}>
        <Event event={event} />
      </div>
    ));

  return (
    <section className={style()}>
      {loading ? <div className={styleLoader()}></div> : null}
      <SelectUser />
      {error ? <Error message={message} /> : eventContent}
    </section>
  );
};
export default EventsPetitionsPage;
