import React, { useContext } from "react";

import { StoreContext } from "../StoreProvider";
import AdminPages from "./adminPages/AdminPages";
import UserPages from "./userPages/UserPages";
import NoLoginPages from "./noLoginPages/NoLoginPages";

const Content = () => {
  const { isLogged, isAdmin } = useContext(StoreContext);

  const contentForm = isLogged ? (
    isAdmin ? (
      <AdminPages />
    ) : (
      <UserPages />
    )
  ) : (
    <NoLoginPages />
  );

  return <section>{contentForm}</section>;
};
export default Content;
