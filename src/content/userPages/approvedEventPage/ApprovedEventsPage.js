import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import Event from "../../components/event/Event";
import Error from "../../components/error/Error";
import Loader from "../../components/loader/Loader";

const ApprovedEventsPage = () => {
  const { token, setToken, setIsLogged, setIsAdmin, setValidAt } =
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
  }, []);

  const getContent = async () => {
    try {
      const options = {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      };
      const response = await fetch(URI + "/events", options);
      const data = await response.json();
      if (data.status === "OK") {
        setEvents(data.response);
        setError(false);
        setMessage("");
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

  const eventsContent = events
    .filter((event) => event.status === "approved")
    .map((event) => (
      <div className="col" key={event.id}>
        <Event event={event} />
      </div>
    ));

  return (
    <>
      <h2>Urlopy zatwierdzone</h2>
      {error ? (
        <Error message={message} />
      ) : (
        <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 mb-5">
          {eventsContent}
        </div>
      )}
      {loading ? <Loader /> : null}
    </>
  );
};
export default ApprovedEventsPage;
