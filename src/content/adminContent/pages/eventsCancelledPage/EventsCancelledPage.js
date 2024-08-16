import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";
import { StoreContext } from "../../../../StoreProvider";
import { URI } from "../../../../config";
import SelectUser from "../../../components/selectUser/SelectUser";
import Event from "../../../components/event/Event";
import Error from "../../../components/error/Error";

import { default as UsersStyles } from "./EventsCancelledPage.module.scss";

const style = BemCssModules(UsersStyles);

const EventsCancelledPage = () => {
  const { token, setToken, setIsLogged, setIsAdmin, setIsValid, userId } =
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
          navigate("/");
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
  }, [userId]);

  const eventContent = events
    .filter((event) => event.status === "cancelled")
    .map((event) => (
      <div key={event.id}>
        <Event event={event} />
      </div>
    ));

  return (
    <section className={style()}>
      <SelectUser />
      {error ? <Error message={message} /> : eventContent}
    </section>
  );
};
export default EventsCancelledPage;
