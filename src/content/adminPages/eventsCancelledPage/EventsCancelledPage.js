import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import SelectUser from "../../components/selectUser/SelectUser";
import Event from "../../components/event/Event";
import Error from "../../components/error/Error";
import Loader from "../../components/loader/Loader";

const EventsCancelledPage = () => {
  const { token, setToken, setIsLogged, setIsAdmin, setValidAt, userId } =
    useContext(StoreContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    getContent();
    const interval = setInterval(() => {
      getContent();
    }, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  const getContent = async () => {
    try {
      const options = {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      };
      let response;
      if (userId) {
        response = await fetch(URI + "/events?userid=" + userId, options);
      } else {
        response = await fetch(URI + "/events", options);
      }
      const data = await response.json();
      if (data.status === "OK") {
        setEvents(data.response);
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
  };

  const eventContent = events
    .filter((event) => event.status === "cancelled")
    .map((event) => (
      <div className="col" key={event.id}>
        <Event event={event} />
      </div>
    ));

  return (
    <>
      <SelectUser defaultUserId={userId || "default"} />
      {error ? (
        <Error message={message} />
      ) : (
        <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 mt-3 mb-5">
          {eventContent}
        </div>
      )}
      {loading ? <Loader /> : null}
    </>
  );
};
export default EventsCancelledPage;
