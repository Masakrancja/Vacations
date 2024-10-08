import React, { useContext } from "react";
import { StoreContext } from "../StoreProvider";

import AdminMenu from "./adminMenu/AdminMenu";
import UserMenu from "./userMenu/UserMenu";
import StandardMenu from "./standardMenu/StandardMenu";

const Menu = () => {
  const { isLogged, isAdmin } = useContext(StoreContext);

  const menuContent = isLogged ? (
    isAdmin ? (
      <AdminMenu />
    ) : (
      <UserMenu />
    )
  ) : (
    <StandardMenu />
  );

  return <div className="col-lg-2 col-md-12 p-2">{menuContent}</div>;
};
export default Menu;
