import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";
import { StoreContext } from "../../../../StoreProvider";
import { URI } from "../../../../config";
import Event from "../../../components/event/Event";
import Error from "../../../components/error/Error";

import { default as AllEventsStyles } from "./AllEventsPage.module.scss";

const style = BemCssModules(AllEventsStyles);

const AllEventsPage = () => {
  const { token, setToken, setIsLogged, setIsAdmin, setIsValid } =
    useContext(StoreContext);
  const [events, setEvents] = useState([]);
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
          navigate("/");
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
  }, []);

  const eventsContent = events.map((event) => (
    <div key={event.id}>
      <Event event={event} />
    </div>
  ));

  return (
    <section className={style()}>
      <h2>Moje urlopy</h2>
      {error ? <Error message={message} /> : eventsContent}
    </section>
  );
};
export default AllEventsPage;
