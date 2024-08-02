import React, { useContext, useEffect, useState } from "react";
import BemCssModules from "bem-css-modules";
import { StoreContext } from "../../../../StoreProvider";
import EventChangeStatus from "../eventChangeStatus/EventChangeStatus";

import { default as EventStyle } from "./Event.module.scss";

const style = BemCssModules(EventStyle);

const Event = ({ id, dateFrom, dateTo, days, notice, reasonName, status }) => {
  const { isAdmin } = useContext(StoreContext);
  const [statusName, setStatusName] = useState(null);

  useEffect(() => {
    setStatusName(
      status === "pending"
        ? "Oczekuje na zatwierdzenie"
        : status === "cancelled"
        ? "Anulowany"
        : "Zatwierdzony"
    );
  }, []);

  return (
    <div className={style()}>
      <p>Data od: {dateFrom}</p>
      <p>Data do: {dateTo}</p>
      <p>Ilość dni: {days}</p>
      <p>Powód urlopu: {reasonName}</p>
      <p>Status urlopu: {statusName}</p>
      {isAdmin ? (
        <EventChangeStatus
          id={id}
          status={status}
          setStatusName={setStatusName}
        />
      ) : null}
      {notice ? <p>{notice}</p> : null}
    </div>
  );
};
export default Event;
