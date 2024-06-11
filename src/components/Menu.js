import React from "react";
import { NavLink } from "react-router-dom";

import "./css/menu.css";

const Menu = ({ items }) => {
  const menu = items.map((item) => (
    <li key={item.id}>
      <NavLink to={item.path} exact={item.exact}>
        {item.name}
      </NavLink>
    </li>
  ));
  return <ul className="menu">{menu}</ul>;
};
export default Menu;
