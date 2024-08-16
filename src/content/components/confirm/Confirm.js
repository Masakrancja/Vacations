import React from "react";
import BemCssModules from "bem-css-modules";

import { default as ConfirmStyle } from "./Confirm.module.scss";

const style = BemCssModules(ConfirmStyle);

const Confirm = ({ setShow, setIsConfirmed }) => {
  const handleYes = () => {
    setIsConfirmed(true);
    setShow(false);
  };

  const handleNo = () => {
    setIsConfirmed(false);
    setShow(false);
  };

  return (
    <div className={style()}>
      <h4>Na pewno?</h4>
      <button onClick={handleYes}>Tak</button>
      <button onClick={handleNo}>Nie</button>
    </div>
  );
};
export default Confirm;
