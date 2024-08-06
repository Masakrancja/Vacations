import React from "react";
import BemCssModules from "bem-css-modules";

import { default as EventWantCancelStyle } from "./EventWantCancel.module.scss";

const style = BemCssModules(EventWantCancelStyle);

const EventWantCancel = ({ id }) => {
  return (
    <div className={style()}>
      <button>Wyślij prośbę o anulowanie</button>
    </div>
  );
};
export default EventWantCancel;
