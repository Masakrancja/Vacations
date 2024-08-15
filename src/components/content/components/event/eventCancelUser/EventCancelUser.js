import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../../../../StoreProvider";

import { URI } from "../../../../../config";
import Error from "../../error/Error";

const EventCancelUser = ({ event, setEvent, index }) => {
  const { token, setToken, setIsLogged, setIsAdmin, setIsValid, setEvents } =
    useContext(StoreContext);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  let btnName = "";
  if (event.wantCancel === "yes") {
    btnName = "Anuluj prośbę o anulowanie";
  } else if (event.wantCancel === "no") {
    btnName = "Wyślij prośbę o anulowanie";
  }

  const { id } = event;

  const handleOnClick = () => {
    (async () => {
      const options = {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          wantCancel: event.wantCancel === "yes" ? "no" : "yes",
        }),
      };
      return await fetch(URI + "/events/" + id, options);
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
        } else if (data.code === 200) {
          setError(false);
          setMessage("");
          const wantCancel = event.wantCancel === "yes" ? "no" : "yes";
          setEvent((prevEvent) => ({ ...prevEvent, wantCancel }));
          setEvents((prevEvents) =>
            prevEvents.map((event, position) => {
              if (position === index) {
                event.wantCancel = wantCancel;
              }
              return event;
            })
          );
        } else {
          setError(true);
          setMessage(data.message);
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(err.message);
      });
  };

  return (
    <>
      <div>
        <button onClick={handleOnClick}>{btnName}</button>
      </div>
      {error ? <Error message={message} /> : null}
    </>
  );
};
export default EventCancelUser;
