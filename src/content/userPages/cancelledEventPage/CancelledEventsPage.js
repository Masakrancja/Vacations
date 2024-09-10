import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";
import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import Event from "../../components/event/Event";
import Error from "../../components/error/Error";

import { default as LoaderStyles } from "../../../Loader.module.scss";

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
      <div className="col p-2" key={event.id}>
        <Event event={event} />
      </div>
    ));

  return (
    <>
      {loading ? <div className={styleLoader()}></div> : null}
      <h2>Urlopy anulowane</h2>
      {error ? (
        <Error message={message} />
      ) : (
        <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1">
          {eventsContent}
        </div>
      )}
    </>
  );
};
export default CancelledEventsPage;
