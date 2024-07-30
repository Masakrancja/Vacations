import React from "react";
import BemCssModules from "bem-css-modules";

import { default as EventStyle } from "./Event.module.scss";

const style = BemCssModules(EventStyle);

const Event = ({ dateFrom, dateTo, days, notice, reasonName, status }) => {
  return (
    <div className={style()}>
      <p>Data od: {dateFrom}</p>
      <p>Data do: {dateTo}</p>
      <p>Ilość dni: {days}</p>
      <p>Powód urlopu: {reasonName}</p>
      <p>Status urlopu: {status}</p>
      {notice ? <p>{notice}</p> : null}
    </div>
  );
};
export default Event;
