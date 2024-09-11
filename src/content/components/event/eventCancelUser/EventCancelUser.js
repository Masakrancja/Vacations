import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../../../StoreProvider";
import { URI } from "../../../../config";
import Error from "../../error/Error";
import Loader from "../../loader/Loader";

const EventCancelUser = ({ event, setEvent }) => {
  const { token, setToken, setIsLogged, setIsAdmin, setValidAt } =
    useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  let btnName = "";
  if (event.wantCancel === "yes") {
    btnName = "Anuluj prośbę o anulowanie urlopu";
  } else if (event.wantCancel === "no") {
    btnName = "Wyślij prośbę o anulowanie urlopu";
  }

  const { id } = event;

  const handleOnClick = () => {
    setError(false);
    setLoading(true);
    (async () => {
      try {
        const options = {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            wantCancel: event.wantCancel === "yes" ? "no" : "yes",
          }),
        };
        const response = await fetch(URI + "/events/" + id, options);
        const data = await response.json();
        if (data.status === "OK") {
          setError(false);
          setMessage("");
          const wantCancel = event.wantCancel === "yes" ? "no" : "yes";
          setEvent((prevEvent) => ({ ...prevEvent, wantCancel }));
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
  };

  return (
    <div className="text-center p-2">
      <button
        className="btn btn-sm btn-outline-primary"
        onClick={handleOnClick}
      >
        {btnName}
      </button>
      {loading ? <Loader /> : null}
      {error ? <Error message={message} /> : null}
    </div>
  );
};
export default EventCancelUser;
