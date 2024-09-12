import React, { useContext, useState } from "react";
import { StoreContext } from "../../../../StoreProvider";

const EventShow = ({ event }) => {
  const { isAdmin } = useContext(StoreContext);
  const [displayCaption, setDisplayCaption] = useState("Pokaż notatkę");

  const { dateFrom, dateTo, days, notice, reasonName, status } = event;

  const statusName =
    status === "pending"
      ? "Oczekuje na zatwierdzenie"
      : status === "cancelled"
      ? "Anulowany"
      : "Zatwierdzony";

  const handleOnClick = (e) => {
    const open = e.currentTarget.attributes.open?.value;
    if (open === undefined) {
      setDisplayCaption("Ukryj notatkę");
    } else {
      setDisplayCaption("Pokaż notatkę");
    }
  };

  return (
    <>
      <div className="card-header">Urlop {statusName}</div>
      <div className="card-body">
        <h5 className="card-title">Ilość dni: {days}</h5>
        <div className="card-text">
          Data od: <span className="fw-bold">{dateFrom}</span>
        </div>
        <div className="card-text">
          Data do: <span className="fw-bold">{dateTo}</span>
        </div>
        <div className="card-text">
          Powód urlopu: <span className="fw-bold">{reasonName}</span>
        </div>
        {!isAdmin ? (
          notice ? (
            <details className="card-text" onClick={handleOnClick}>
              <summary>{displayCaption}</summary>
              <div className="fst-italic">{notice}</div>
            </details>
          ) : null
        ) : null}
      </div>
    </>
  );
};
export default EventShow;
