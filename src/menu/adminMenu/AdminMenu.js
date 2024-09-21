import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <nav>
      <div className="list-group">
        <NavLink
          to="/users/all"
          exact="false"
          className={({ isActive }) =>
            [isActive ? "fw-bold list-group-item-primary" : null].join(" ") +
            " list-group-item list-group-item-action"
          }
        >
          Moi pracownicy
        </NavLink>
        <NavLink
          to="/users/pending"
          exact="false"
          className={({ isActive }) =>
            [isActive ? "fw-bold list-group-item-primary" : null].join(" ") +
            " list-group-item list-group-item-action"
          }
        >
          Pracownicy oczekujący
        </NavLink>
        <NavLink
          to="/events/pending"
          exact="true"
          className={({ isActive }) =>
            [isActive ? "fw-bold list-group-item-primary" : null].join(" ") +
            " list-group-item list-group-item-action"
          }
        >
          Urlopy oczekujące
        </NavLink>
        <NavLink
          to="/events/approved"
          exact="false"
          className={({ isActive }) =>
            [isActive ? "fw-bold list-group-item-primary" : null].join(" ") +
            " list-group-item list-group-item-action"
          }
        >
          Urlopy zatwierdzone
        </NavLink>
        <NavLink
          to="/events/cancelled"
          exact="false"
          className={({ isActive }) =>
            [isActive ? "fw-bold list-group-item-primary" : null].join(" ") +
            " list-group-item list-group-item-action"
          }
        >
          Urlopy odrzucone
        </NavLink>
        <NavLink
          to="/events/petitions"
          exact="false"
          className={({ isActive }) =>
            [isActive ? "fw-bold list-group-item-primary" : null].join(" ") +
            " list-group-item list-group-item-action"
          }
        >
          Prośby o anulowanie urlopu
        </NavLink>
        <NavLink
          to="/me"
          exact="false"
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
export default AdminMenu;
