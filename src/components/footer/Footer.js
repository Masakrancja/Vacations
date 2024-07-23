import React from "react";
import BemCssModules from "bem-css-modules";

import { default as FooterStyles } from "./Footer.module.scss";

const style = BemCssModules(FooterStyles);

const Footer = () => {
  return (
    <footer className={style()}>
      <h3 className={style("title")}>Projekt zaliczeniowy PAW</h3>
    </footer>
  );
};
export default Footer;
