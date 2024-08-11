import React, { useContext, useEffect, useState } from "react";
import BemCssModules from "bem-css-modules";
import { UserStoreContext } from "../../userContent/UserStoreProvider";

import EventShow from "./eventShow/EventShow";

import { default as EventStyle } from "./Event.module.scss";
import EventEdit from "./eventEdit/EventEdit";

const style = BemCssModules(EventStyle);

const Event = ({ event, index }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [btnName, setBtnName] = useState("Edytuj");
  const { events } = useContext(UserStoreContext);

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
    console.log("trzeba zaimplementować");
  };

  return (
    <div className={style()}>
      {isEdit ? (
        <EventEdit event={event} index={index} />
      ) : (
        <EventShow event={event} index={index} />
      )}
      <button onClick={toogleEdit}>{btnName}</button>
      {event.status === "pending" ? (
        <button onClick={handleDelete}>Usuń</button>
      ) : null}
    </div>
  );
};
export default Event;
