import React from "react";
import BemCssModules from "bem-css-modules";

import { default as SuccessStyle } from "./Success.module.scss";

const style = BemCssModules(SuccessStyle);

const Success = ({ message }) => {
  return <div className={style()}>{message}</div>;
};
export default Success;
