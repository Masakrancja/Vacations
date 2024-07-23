import React from "react";
import BemCssModules from "bem-css-modules";

import { default as ErrorStyle } from "./Error.module.scss";

const style = BemCssModules(ErrorStyle);

const Error = ({ message }) => {
  return <div className={style()}>{message}</div>;
};
export default Error;
