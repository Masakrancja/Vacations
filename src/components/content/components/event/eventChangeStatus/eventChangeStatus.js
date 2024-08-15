import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../../../../StoreProvider";
import { AdminStoreContext } from "../../../adminContent/AdminStoreProvider";
import { URI } from "../../../../../config";
import Error from "../../error/Error";

const EventChangeStatus = ({ event, index }) => {
  const { token, setToken, setIsLogged, setIsAdmin, setIsValid } =
    useContext(StoreContext);
  const { events, setEvents } = useContext(AdminStoreContext);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const handleOnClick = (e) => {
    const { id } = event;
    const { status } = e.target.dataset;

    (async () => {
      const options = {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          status,
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
        }
        if (data.code === 200) {
          setError(false);
          setMessage("");
          setIsConfirmed(true);
          setEvents(
            events.map((event, position) => {
              if (position === index) {
                event.statusus = status;
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
      {isConfirmed === false ? (
        <>
          <div>
            <button data-status="approved" onClick={handleOnClick}>
              Zatwierdź
            </button>
            <button data-status="canceled" onClick={handleOnClick}>
              Odrzuć
            </button>
          </div>
          {error ? <Error message={message} /> : null}
        </>
      ) : null}
    </>
  );
};
export default EventChangeStatus;
