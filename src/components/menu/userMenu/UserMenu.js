import React from "react";
import { NavLink } from "react-router-dom";
import BemCssModules from "bem-css-modules";

import { default as UserMenuStyles } from "./UserMenu.module.scss";

const style = BemCssModules(UserMenuStyles);

const UserMenu = () => {
  return (
    <nav className={style()}>
      <ul>
        <li>
          <NavLink to="/events/add" exact="false">
            Dodaj urlop
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" exact="false">
            Moje urlopy
          </NavLink>
        </li>
        <li>
          <NavLink to="/events/waiting" exact="false">
            Urlopy oczekujące
          </NavLink>
        </li>
        <li>
          <NavLink to="/events/approved" exact="false">
            Urlopy zatwierdzone
          </NavLink>
        </li>
        <li>
          <NavLink to="/events/rejected" exact="false">
            Urlopy odrzucone
          </NavLink>
        </li>
        <li>
          <NavLink to="/me" exact="false">
            Moje konto
          </NavLink>
        </li>
        <li>
          <NavLink to="/logout" exact="false">
            Wyloguj
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default UserMenu;
