import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import BemCssModules from "bem-css-modules";
import { StoreContext } from "../../../../../StoreProvider";
import { URI } from "../../../../../config";
import Event from "../../../components/event/Event";
import Error from "../../../components/error/Error";

import { default as PendingEventsStyles } from "./PendingEventsPage.module.scss";

const style = BemCssModules(PendingEventsStyles);

const PendingEventsPage = () => {
  const { token, setToken, setIsLogged, setIsAdmin, setIsValid } =
    useContext(StoreContext);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);

  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      };
      return await fetch(URI + "/events", options);
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
        }
        if (data.code === 200) {
          setEvents(data.response);
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
  }, [token]);

  const eventsContent = events
    .filter((event) => event.status === "pending")
    .map((event) => (
      <div key={event.id}>
        <Event {...event} />
      </div>
    ));

  return (
    <section className={style()}>
      <h2>Urlopy oczekujące</h2>
      {error ? <Error message={message} /> : eventsContent}
    </section>
  );
};
export default PendingEventsPage;
