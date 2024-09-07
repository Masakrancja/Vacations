import React, { useContext, useState } from "react";

import { StoreContext } from "../../../StoreProvider";
import EventShow from "./eventShow/EventShow";
import EventEdit from "./eventEdit/EventEdit";
import Confirm from "../confirm/Confirm";
import EventDelete from "./eventDelete/EventDelete";
import EventCancelUser from "./eventCancelUser/EventCancelUser";
import EventCancelAdmin from "./eventCancelAdmin/EventCancelAdmin";
import EventChangeStatus from "./eventChangeStatus/eventChangeStatus";

const Event = ({ event }) => {
  const { isAdmin, userFullName } = useContext(StoreContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [show, setShow] = useState(false);
  const [btnName, setBtnName] = useState("Edytuj");
  const [localEvent, setLocalEvent] = useState(event);
  const { status, wantCancel } = localEvent;

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
      {isAdmin ? (
        <>
          {event !== null ? (
            <div className="col p-2 mt-2">
              <div
                className="card border-primary mb-3"
                style={{ maxWidth: "18rem" }}
              >
                {userFullName ? (
                  <div className="card-header">{userFullName}</div>
                ) : null}

                <div className="card-body">
                  <EventShow event={localEvent} />
                  {status === "pending" ? (
                    <EventChangeStatus
                      event={localEvent}
                      setEvent={setLocalEvent}
                    />
                  ) : null}
                  {wantCancel === "yes" ? (
                    <EventCancelAdmin
                      event={localEvent}
                      setEvent={setLocalEvent}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div className="col p-2 mt-2">
          {event !== null ? (
            <>
              <div
                className="card border-primary mb-3"
                style={{ maxWidth: "18rem" }}
              >
                {isEdit ? (
                  <EventEdit event={localEvent} setEvent={setLocalEvent} />
                ) : (
                  <EventShow event={localEvent} />
                )}
                <button className="btn btn-primary" onClick={toogleEdit}>
                  {btnName}
                </button>
                {status === "pending" ? (
                  <button className="btn btn-primary" onClick={handleDelete}>
                    Usuń
                  </button>
                ) : null}
                {status === "approved" ? (
                  <>
                    <EventCancelUser
                      event={localEvent}
                      setEvent={setLocalEvent}
                    />
                    {wantCancel === "yes" ? "Oczekuje na akceptacje" : null}
                  </>
                ) : null}
                {show ? (
                  <Confirm setShow={setShow} setIsConfirmed={setIsConfirmed} />
                ) : null}
                {isConfirmed ? (
                  <EventDelete event={localEvent} setEvent={setLocalEvent} />
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      )}
    </>
  );
};
export default Event;
