import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";
import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import Event from "../../components/event/Event";
import Error from "../../components/error/Error";

import { default as CancelledEventsStyles } from "./CancelledEventsPage.module.scss";
import { default as LoaderStyles } from "../../../Loader.module.scss";

const style = BemCssModules(CancelledEventsStyles);
const styleLoader = BemCssModules(LoaderStyles);

const CancelledEventsPage = () => {
  const { token, setToken, setIsLogged, setIsAdmin, setValidAt } =
    useContext(StoreContext);
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
        const response = await fetch(URI + "/events", options);
        const data = await response.json();
        if (data.status === "OK") {
          setEvents(data.response);
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

  const eventsContent = events
    .filter((event) => event.status === "cancelled")
    .map((event) => (
      <div key={event.id}>
        <Event event={event} />
      </div>
    ));

  return (
    <section className={style()}>
      {loading ? <div className={styleLoader()}></div> : null}
      <h2>Urlopy anulowane</h2>
      {error ? <Error message={message} /> : eventsContent}
    </section>
  );
};
export default CancelledEventsPage;
