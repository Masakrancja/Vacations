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

  return <div className="col-xl-10 col-md-12 p-2">{contentForm}</div>;
};
export default Content;
