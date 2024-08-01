import React, { useContext, useState, useEffect } from "react";
import BemCssModules from "bem-css-modules";
import { StoreContext } from "../../../../../StoreProvider";
import { AdminStoreContext } from "../../AdminStoreProvider";
import { URI } from "../../../../../config";
import SelectUser from "../../../components/selectUser/SelectUser";
import Event from "../../../components/event/Event";
import Error from "../../../components/error/Error";

import { default as UsersStyles } from "./EventsPage.module.scss";

const style = BemCssModules(UsersStyles);

const EventsPage = () => {
  const { token } = useContext(StoreContext);
  const { userId } = useContext(AdminStoreContext);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      };
      if (userId) {
        return fetch(URI + "/events?userid=" + userId, options);
      } else {
        return fetch(URI + "/events", options);
      }
    })()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code === 200) {
          setEvents(data.response);
          setError(false);
          setMessage("");
        } else if (data.code !== 404) {
          setError(true);
          setMessage(data.message);
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(err.message);
      });
  }, [token, userId]);

  const eventContent = events.map((event) => (
    <Event key={event.id} {...event} />
  ));

  return (
    <section className={style()}>
      <SelectUser />
      {error ? <Error message={message} /> : eventContent}
    </section>
  );
};
export default EventsPage;
