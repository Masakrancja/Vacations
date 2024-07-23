import React from "react";
import BemCssModules from "bem-css-modules";

import { default as ErrorPageStyles } from "./ErrorPage.module.scss";

const style = BemCssModules(ErrorPageStyles);

const ErrorPage = () => {
  return <>Wybrana strona nie istnieje</>;
};
export default ErrorPage;
