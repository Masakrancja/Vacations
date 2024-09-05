import React from "react";
import { NavLink } from "react-router-dom";

const StandardMenu = () => {
  return (
    <nav>
      <ul className="list-group">
        <li className="list-group-item">
          <NavLink
            to="/register"
            exact="false"
            className={({ isActive }) =>
              [
                isActive
                  ? "fw-bold text-decoration-none"
                  : "text-decoration-none",
              ].join(" ")
            }
          >
            Rejestracja
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink
            to="/groups"
            exact="true"
            className={({ isActive }) =>
              [
                isActive
                  ? "fw-bold text-decoration-none"
                  : "text-decoration-none",
              ].join(" ")
            }
          >
            Dostępne firmy
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default StandardMenu;
