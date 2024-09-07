import React from "react";
import { NavLink } from "react-router-dom";

const StandardMenu = () => {
  return (
    <nav>
      <div className="list-group">
        <NavLink
          to="/register"
          exact="false"
          className={({ isActive }) =>
            [isActive ? "fw-bold list-group-item-primary" : null].join(" ") +
            " list-group-item list-group-item-action"
          }
        >
          Rejestracja
        </NavLink>
        <NavLink
          to="/groups"
          exact="true"
          className={({ isActive }) =>
            [isActive ? "fw-bold list-group-item-primary" : null].join(" ") +
            " list-group-item list-group-item-action"
          }
        >
          Dostępne firmy
        </NavLink>
      </div>
    </nav>
  );
};
export default StandardMenu;
