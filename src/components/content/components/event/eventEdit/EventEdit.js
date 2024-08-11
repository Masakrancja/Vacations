import React, { useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../../../../StoreProvider";
import { UserStoreContext } from "../../../userContent/UserStoreProvider";
import { URI } from "../../../../../config";
import Error from "../../error/Error";
import Success from "../../success/Success";
import EventChangeStatus from "../../eventChangeStatus/EventChangeStatus";
import SelectReason from "../../selectReason/SelectReason";

const EventEdit = ({ event, index }) => {
  const { token, isAdmin, setToken, setIsLogged, setIsAdmin, setIsValid } =
    useContext(StoreContext);
  const { setEvents } = useContext(UserStoreContext);
  const [dateFrom, setDateFrom] = useState(event.dateFrom);
  const [dateTo, setDateTo] = useState(event.dateTo);
  const [notice, setNotice] = useState(event.notice);
  const [reasonId, setReasonId] = useState(event.reasonId);

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleChangeFrom = (e) => {
    setDateFrom(e.target.value);
  };

  const handleChangeTo = (e) => {
    setDateTo(e.target.value);
  };

  const handleChangeNotice = (e) => {
    setNotice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      const { id } = event;
      const options = {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          dateFrom,
          dateTo,
          notice,
          reasonId,
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
          setEvents((prevEvents) =>
            prevEvents.map((prevEvent, prevIndex) => {
              if (prevIndex === index) {
                return data.response;
              } else {
                return prevEvent;
              }
            })
          );
          setError(false);
          setMessage("Poprawnie zapisano urlop");
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
  const { id, status } = event;
  return (
    <>
      {isAdmin ? (
        <>
          <EventChangeStatus id={id} status={status} />
        </>
      ) : (
        <>
          <form method="POST" onSubmit={handleSubmit}>
            <SelectReason id={reasonId} setReasonId={setReasonId} />
            <label>
              Data od:
              <input type="date" value={dateFrom} onChange={handleChangeFrom} />
            </label>
            <label>
              Data do:
              <input type="date" value={dateTo} onChange={handleChangeTo} />
            </label>
            <label>
              Notatka:
              <textarea value={notice} onChange={handleChangeNotice}></textarea>
            </label>
            <button type="submit">Zapisz</button>
          </form>
          {error ? <Error message={message} /> : <Success message={message} />}
        </>
      )}
    </>
  );
};
export default EventEdit;
