import React from "react";
import { NavLink } from "react-router-dom";
import BemCssModules from "bem-css-modules";

import { default as AdminMenuStyles } from "./AdminMenu.module.scss";

const style = BemCssModules(AdminMenuStyles);

const AdminMenu = () => {
  return (
    <nav className={style()}>
      <ul>
        <li>
          <NavLink to="/users" exact="false">
            Moi pracownicy
          </NavLink>
        </li>
        <li>
          <NavLink to="/users/pending" exact="false">
            Pracownicy oczekujący
          </NavLink>
        </li>
        <li>
          <NavLink to="/events" exact="false">
            Urlopy pracowników
          </NavLink>
        </li>
        <li>
          <NavLink to="/events/pending" exact="true">
            Urlopy oczekujące
          </NavLink>
        </li>
        <li>
          <NavLink to="/events/approved" exact="false">
            Urlopy zatwierdzone
          </NavLink>
        </li>
        <li>
          <NavLink to="/events/cancelled" exact="false">
            Urlopy odrzucone
          </NavLink>
        </li>
        <li>
          <NavLink to="/events/petitions" exact="false">
            Prośby o anulowanie urlopu
          </NavLink>
        </li>
        <li>
          <NavLink to="/me" exact="false">
            Moje konto
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default AdminMenu;
