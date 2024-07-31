import React, { useContext, useState, useEffect } from "react";
import BemCssModules from "bem-css-modules";
import { StoreContext } from "../../../../../StoreProvider";
import { URI } from "../../../../../config";
import Event from "../../../components/event/Event";
import Error from "../../../components/error/Error";

import { default as CancelledEventsStyles } from "./CancelledEventsPage.module.scss";

const style = BemCssModules(CancelledEventsStyles);

const CancelledEventsPage = () => {
  const { token } = useContext(StoreContext);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

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
    .filter((event) => event.status === "cancelled")
    .map((event) => (
      <div key={event.id}>
        <Event {...event} />
      </div>
    ));

  return (
    <section className={style()}>
      <h2>Urlopy anulowane</h2>

      {error ? <Error message={message} /> : eventsContent}
    </section>
  );
};
export default CancelledEventsPage;
