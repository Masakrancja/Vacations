import React, { useContext, useState } from "react";
import BemCssModules from "bem-css-modules";

import { StoreContext } from "../../../StoreProvider";
import EventShow from "./eventShow/EventShow";
import EventEdit from "./eventEdit/EventEdit";
import Confirm from "../confirm/Confirm";
import EventDelete from "./eventDelete/EventDelete";
import EventCancelUser from "./eventCancelUser/EventCancelUser";
import EventCancelAdmin from "./eventCancelAdmin/EventCancelAdmin";
import EventChangeStatus from "./eventChangeStatus/eventChangeStatus";

import { default as EventStyle } from "./Event.module.scss";

const style = BemCssModules(EventStyle);

const Event = ({ event }) => {
  const { isAdmin } = useContext(StoreContext);
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
        <div className={style()}>
          {event !== null ? (
            <>
              <EventShow event={localEvent} />
              {status === "pending" ? (
                <EventChangeStatus
                  event={localEvent}
                  setEvent={setLocalEvent}
                />
              ) : null}
              {wantCancel === "yes" ? (
                <EventCancelAdmin event={localEvent} setEvent={setLocalEvent} />
              ) : null}
            </>
          ) : null}
        </div>
      ) : (
        <div className={style()}>
          {event !== null ? (
            <>
              {isEdit ? (
                <EventEdit event={localEvent} setEvent={setLocalEvent} />
              ) : (
                <EventShow event={localEvent} />
              )}
              <button onClick={toogleEdit}>{btnName}</button>
              {status === "pending" ? (
                <button onClick={handleDelete}>Usuń</button>
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
            </>
          ) : null}
        </div>
      )}
    </>
  );
};
export default Event;
