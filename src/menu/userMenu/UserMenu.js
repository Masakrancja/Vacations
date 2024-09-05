import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <nav>
      <ul className="list-group">
        <li className="list-group-item">
          <NavLink
            to="/events/add"
            className={({ isActive }) =>
              [
                isActive
                  ? "fw-bold text-decoration-none"
                  : "text-decoration-none",
              ].join(" ")
            }
          >
            Dodaj urlop
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink
            to="/events/all"
            className={({ isActive }) =>
              [
                isActive
                  ? "fw-bold text-decoration-none"
                  : "text-decoration-none",
              ].join(" ")
            }
          >
            Moje urlopy
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink
            to="/events/pending"
            className={({ isActive }) =>
              [
                isActive
                  ? "fw-bold text-decoration-none"
                  : "text-decoration-none",
              ].join(" ")
            }
          >
            Urlopy oczekujące
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink
            to="/events/approved"
            className={({ isActive }) =>
              [
                isActive
                  ? "fw-bold text-decoration-none"
                  : "text-decoration-none",
              ].join(" ")
            }
          >
            Urlopy zatwierdzone
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink
            to="/events/cancelled"
            className={({ isActive }) =>
              [
                isActive
                  ? "fw-bold text-decoration-none"
                  : "text-decoration-none",
              ].join(" ")
            }
          >
            Urlopy anulowane
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink
            to="/me"
            className={({ isActive }) =>
              [
                isActive
                  ? "fw-bold text-decoration-none"
                  : "text-decoration-none",
              ].join(" ")
            }
          >
            Moje konto
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default UserMenu;
