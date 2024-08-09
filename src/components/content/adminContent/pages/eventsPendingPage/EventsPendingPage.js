import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import BemCssModules from "bem-css-modules";
import { StoreContext } from "../../../../../StoreProvider";
import { AdminStoreContext } from "../../AdminStoreProvider";
import { URI } from "../../../../../config";
import SelectUser from "../../../components/selectUser/SelectUser";
import Event from "../../../components/event/Event";
import Error from "../../../components/error/Error";

import { default as UsersStyles } from "./EventsPendingPage.module.scss";

const style = BemCssModules(UsersStyles);

const EventsPendingPage = () => {
  const { token, setToken, setIsLogged, setIsAdmin, setIsValid } =
    useContext(StoreContext);
  const { userId } = useContext(AdminStoreContext);
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

  const eventContent = events
    .filter((event) => event.status === "pending")
    .map((event) => <Event key={event.id} {...event} />);

  return (
    <section className={style()}>
      <SelectUser />
      {error ? <Error message={message} /> : eventContent}
    </section>
  );
};
export default EventsPendingPage;
