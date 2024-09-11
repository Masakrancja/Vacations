import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../../../StoreProvider";
import { URI } from "../../../../config";
import Error from "../../error/Error";
import Loader from "../../loader/Loader";

const EventChangeStatus = ({ event, setEvent }) => {
  const { token, setToken, setIsLogged, setIsAdmin, setValidAt } =
    useContext(StoreContext);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleOnClick = (e) => {
    const { id } = event;
    const { status } = e.target.dataset;
    setLoading(true);
    setError(false);
    (async () => {
      try {
        const options = {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            status,
          }),
        };
        const response = await fetch(URI + "/events/" + id, options);
        const data = await response.json();
        if (data.status === "OK") {
          setError(false);
          setMessage("");
          setIsConfirmed(true);
          setEvent((prevEvent) => ({ ...prevEvent, status }));
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
    <>
      {isConfirmed === false ? (
        <>
          <div>
            <button
              className="btn btn-sm btn-outline-success"
              data-status="approved"
              onClick={handleOnClick}
            >
              Zatwierdź
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              data-status="canceled"
              onClick={handleOnClick}
            >
              Odrzuć
            </button>
          </div>
          {error ? <Error message={message} /> : null}
        </>
      ) : null}
      {loading ? <Loader /> : null}
    </>
  );
};
export default EventChangeStatus;
