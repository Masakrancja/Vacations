import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../../../../StoreProvider";
import { UserStoreContext } from "../../../userContent/UserStoreProvider";

import { URI } from "../../../../../config";
import Error from "../../error/Error";

const EventDelete = ({ event, index }) => {
  const { token, setToken, setIsLogged, setIsAdmin, setIsValid } =
    useContext(StoreContext);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { events, setEvents } = useContext(UserStoreContext);
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const { id } = event;
  useEffect(() => {
    (async () => {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      return await fetch(URI + "/events/" + id, options);
    })()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.code === 200) {
          setError(false);
          setMessage("Poprawnie usunięto urlop");
          setEvents(events.filter((event, position) => position !== index));
        } else if (data.code === 401) {
          setIsLogged(false);
          setIsAdmin(false);
          setToken("");
          setIsValid("");
          removeCookie("isLogged", { path: "/" });
          removeCookie("isAdmin", { path: "/" });
          removeCookie("token", { path: "/" });
          removeCookie("isValid", { path: "/" });
          navigate("/");
        } else {
          setError(true);
          setMessage(data.message);
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(err.messaage);
      });
  }, []);

  return <>{error ? <Error message={message} /> : null}</>;
};
export default EventDelete;
