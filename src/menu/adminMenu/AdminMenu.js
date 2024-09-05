import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <nav>
      <ul className="list-group">
        <li className="list-group-item">
          <NavLink
            to="/users/all"
            exact="false"
            className={({ isActive }) =>
              [
                isActive
                  ? "fw-bold text-decoration-none"
                  : "text-decoration-none",
              ].join(" ")
            }
          >
            Moi pracownicy
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink
            to="/users/pending"
            exact="false"
            className={({ isActive }) =>
              [
                isActive
                  ? "fw-bold text-decoration-none"
                  : "text-decoration-none",
              ].join(" ")
            }
          >
            Pracownicy oczekujący
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink
            to="/events/all"
            exact="false"
            className={({ isActive }) =>
              [
                isActive
                  ? "fw-bold text-decoration-none"
                  : "text-decoration-none",
              ].join(" ")
            }
          >
            Urlopy pracowników
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink
            to="/events/pending"
            exact="true"
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
            exact="false"
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
            exact="false"
            className={({ isActive }) =>
              [
                isActive
                  ? "fw-bold text-decoration-none"
                  : "text-decoration-none",
              ].join(" ")
            }
          >
            Urlopy odrzucone
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink
            to="/events/petitions"
            exact="false"
            className={({ isActive }) =>
              [
                isActive
                  ? "fw-bold text-decoration-none"
                  : "text-decoration-none",
              ].join(" ")
            }
          >
            Prośby o anulowanie urlopu
          </NavLink>
        </li>
        <li className="list-group-item">
          <NavLink
            to="/me"
            exact="false"
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
export default AdminMenu;
