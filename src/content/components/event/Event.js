import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import EventShow from "./eventShow/EventShow";
import EventEdit from "./eventEdit/EventEdit";
import Confirm from "../confirm/Confirm";
import EventCancelUser from "./eventCancelUser/EventCancelUser";
import EventCancelAdmin from "./eventCancelAdmin/EventCancelAdmin";
import EventChangeStatus from "./eventChangeStatus/eventChangeStatus";
import EventWaiting from "./eventWaiting/EventWaiting";
import Loader from "../loader/Loader";
const Event = ({ event }) => {
  const { token, setToken, setIsLogged, setIsAdmin, setValidAt } =
    useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const { isAdmin, userFullName } = useContext(StoreContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [show, setShow] = useState(false);
  const [btnName, setBtnName] = useState("Edytuj");
  const [localEvent, setLocalEvent] = useState(event);

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const { id } = event;
    if (isConfirmed) {
      setLocalEvent(null);
      (async () => {
        const options = {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        try {
          const response = await fetch(URI + "/events/" + id, options);
          const data = await response.json();
          setIsConfirmed(false);

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
          }
        } catch (error) {
          setError(true);
          setMessage(error.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [isConfirmed]);

  let borderColor = "border-primary";
  if (localEvent?.status === "cancelled") {
    borderColor = "border-danger";
  } else if (localEvent?.status === "approved") {
    borderColor = "border-success";
  }

  const toogleEdit = () => {
    setIsEdit((prev) => {
      if (prev) {
        setBtnName("Edytuj");
      } else {
        setBtnName("Powrót");
      }
      return !prev;
    });
  };

  const handleDelete = () => {
    setIsConfirmed(false);
    setShow(true);
  };

  return (
    <>
      {localEvent !== null ? (
        <>
          {isAdmin ? (
            <div
              className={`card ${borderColor} border-2 mx-auto mb-3`}
              style={{ maxWidth: "18rem", minHeight: "24rem" }}
            >
              {userFullName ? (
                <div className="card-header">{userFullName}</div>
              ) : null}

              <div className="card-body">
                <EventShow event={event} />
                {event.status === "pending" ? (
                  <EventChangeStatus
                    event={localEvent}
                    setEvent={setLocalEvent}
                  />
                ) : null}
                {localEvent.wantCancel === "yes" ? (
                  <EventCancelAdmin
                    event={localEvent}
                    setEvent={setLocalEvent}
                  />
                ) : null}
              </div>
            </div>
          ) : (
            <>
              <div
                className={`card ${borderColor} border-2 mx-auto mb-3`}
                style={{ maxWidth: "18rem", minHeight: "24rem" }}
              >
                {isEdit ? (
                  <EventEdit event={localEvent} setEvent={setLocalEvent} />
                ) : (
                  <EventShow event={event} />
                )}
                <div className="row">
                  {localEvent.status === "pending" ? (
                    <>
                      <div className="col p-2 text-center">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={toogleEdit}
                        >
                          {btnName}
                        </button>
                      </div>
                      <div className="col p-2 text-center">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={handleDelete}
                        >
                          Usuń
                        </button>
                      </div>
                    </>
                  ) : null}
                  {localEvent.status === "approved" &&
                  localEvent.dateFrom > today ? (
                    <>
                      <EventCancelUser
                        event={localEvent}
                        setEvent={setLocalEvent}
                      />
                      {localEvent.wantCancel === "yes" ? (
                        <EventWaiting message="Oczekuje na akceptacje" />
                      ) : null}
                    </>
                  ) : null}
                </div>
                {show ? (
                  <Confirm setShow={setShow} setIsConfirmed={setIsConfirmed} />
                ) : null}
                {isConfirmed ? loading ? <Loader /> : null : null}
              </div>
            </>
          )}
        </>
      ) : null}
    </>
  );
};
export default Event;
