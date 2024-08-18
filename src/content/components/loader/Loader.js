import React from "react";
import BemCssModules from "bem-css-modules";

import { default as LoaderStyle } from "./Loader.module.scss";

const style = BemCssModules(LoaderStyle);

const Loader = () => {
  return <div className={style()}></div>;
};
export default Loader;
