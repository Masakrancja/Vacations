import React, { useContext } from "react";
import { StoreContext } from "../../../../../StoreProvider";

const EventShow = ({ event, index }) => {
  const { isAdmin } = useContext(StoreContext);

  const {
    dateFrom,
    dateTo,
    days,
    id,
    notice,
    reasonId,
    reasonName,
    status,
    userId,
    wantCancel,
  } = event;

  const statusName =
    status === "pending"
      ? "Oczekuje na zatwierdzenie"
      : status === "cancelled"
      ? "Anulowany"
      : "Zatwierdzony";

  return (
    <>
      <p>Data od: {dateFrom}</p>
      <p>Data do: {dateTo}</p>
      <p>Ilość dni: {days}</p>
      <p>Powód urlopu: {reasonName}</p>
      <p>Status urlopu: {statusName}</p>
      {!isAdmin ? notice ? <p>{notice}</p> : null : null}
    </>
  );
};
export default EventShow;