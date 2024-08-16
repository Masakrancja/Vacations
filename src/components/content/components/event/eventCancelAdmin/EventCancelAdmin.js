import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../../../../StoreProvider";
import { URI } from "../../../../../config";
import Error from "../../error/Error";
import Success from "../../success/Success";

const EventCancelAdmin = ({ event, setEvent }) => {
  const {
    token,
    setToken,
    setIsLogged,
    setIsAdmin,
    setIsValid,
    setIsEventWasCanceled,
  } = useContext(StoreContext);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const { id, wantCancel } = event;

  const handleOnClik = () => {
    (async () => {
      const options = {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          status: "cancelled",
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
          setMessage("Urlop został anulowany");
          setEvent((prevEvent) => ({
            ...prevEvent,
            wantCancel: "no",
            status: "cancelled",
          }));
          setIsEventWasCanceled(true);
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
      <h6>Pracownik wysłał prośbę o anulowanie urlopu</h6>
      {wantCancel ? <button onClick={handleOnClik}>Anuluj urlop</button> : null}
      {error ? <Error message={message} /> : <Success message={message} />}
    </>
  );
};
export default EventCancelAdmin;
