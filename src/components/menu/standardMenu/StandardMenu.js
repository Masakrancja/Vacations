import React from "react";
import { NavLink } from 'react-router-dom';
import BemCssModules from 'bem-css-modules';

import {default as StandardMenuStyles} from './StandardMenu.module.scss';

const style = BemCssModules(StandardMenuStyles);

const StandardMenu = () => {
  return (
    <nav className={style()}>
      <ul>
        <li><NavLink to="/register" exact="true">Rejestracja</NavLink></li>
        <li><NavLink to="/groups" exact="false">Dostępne firmy</NavLink></li>
      </ul>
    </nav>
  );
}
export default StandardMenu;