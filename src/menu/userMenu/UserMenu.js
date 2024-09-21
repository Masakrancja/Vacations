import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <nav>
      <div className="list-group">
        <NavLink
          to="/events/add"
          className={({ isActive }) =>
            [isActive ? "fw-bold list-group-item-primary" : null].join(" ") +
            " list-group-item list-group-item-action"
          }
        >
          Dodaj urlop
        </NavLink>
        <NavLink
          to="/events/pending"
          className={({ isActive }) =>
            [isActive ? "fw-bold list-group-item-primary" : null].join(" ") +
            " list-group-item list-group-item-action"
          }
        >
          Urlopy oczekujące
        </NavLink>
        <NavLink
          to="/events/approved"
          className={({ isActive }) =>
            [isActive ? "fw-bold list-group-item-primary" : null].join(" ") +
            " list-group-item list-group-item-action"
          }
        >
          Urlopy zatwierdzone
        </NavLink>
        <NavLink
          to="/events/cancelled"
          className={({ isActive }) =>
            [isActive ? "fw-bold list-group-item-primary" : null].join(" ") +
            " list-group-item list-group-item-action"
          }
        >
          Urlopy anulowane
        </NavLink>
        <NavLink
          to="/me"
          className={({ isActive }) =>
            [isActive ? "fw-bold list-group-item-primary" : null].join(" ") +
            " list-group-item list-group-item-action"
          }
        >
          Moje konto
        </NavLink>
      </div>
    </nav>
  );
};
export default UserMenu;
