import React, { useContext, useState } from "react";

import EventShow from "./eventShow/EventShow";
import EventEdit from "./eventEdit/EventEdit";
import Confirm from "../confirm/Confirm";
import EventDelete from "./eventDelete/EventDelete";

import BemCssModules from "bem-css-modules";

import { default as EventStyle } from "./Event.module.scss";

const style = BemCssModules(EventStyle);

const Event = ({ event, index }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [show, setShow] = useState(false);
  const [btnName, setBtnName] = useState("Edytuj");

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
    <div className={isConfirmed ? style("disable") : style()}>
      {isEdit ? (
        <EventEdit event={event} index={index} />
      ) : (
        <EventShow event={event} index={index} />
      )}
      <button onClick={toogleEdit}>{btnName}</button>
      {event.status === "pending" ? (
        <button onClick={handleDelete}>Usuń</button>
      ) : null}
      {show ? (
        <Confirm setShow={setShow} setIsConfirmed={setIsConfirmed} />
      ) : null}
      {isConfirmed ? <EventDelete event={event} index={index} /> : null}
    </div>
  );
};
export default Event;
