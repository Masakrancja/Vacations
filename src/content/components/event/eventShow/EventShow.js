import React, { useContext } from "react";
import { StoreContext } from "../../../../StoreProvider";

const EventShow = ({ event }) => {
  const { isAdmin } = useContext(StoreContext);

  const { dateFrom, dateTo, days, notice, reasonName, status } = event;

  const statusName =
    status === "pending"
      ? "Oczekuje na zatwierdzenie"
      : status === "cancelled"
      ? "Anulowany"
      : "Zatwierdzony";

  return (
    <>
      <div className="card-header">Urlop {statusName}</div>
      <div className="card-body">
        <h5 className="card-title">Ilość dni: {days}</h5>
        <p className="card-text">Data od: {dateFrom}</p>
        <p className="card-text">Data do: {dateTo}</p>
        <p className="card-text">Powód urlopu: {reasonName}</p>
        {!isAdmin ? (
          notice ? (
            <p className="card-text fst-italic">{notice}</p>
          ) : null
        ) : null}
      </div>
    </>
  );
};
export default EventShow;
