import React, { useContext } from "react";

import { StoreContext } from "../../StoreProvider";
import AdminContent from "./adminContent/AdminContent";
import UserContent from "./userContent/UserContent";
import StandardContent from "./standardContent/StandardContent";

const Content = () => {
  const { isLogged, isAdmin } = useContext(StoreContext);

  const contentForm = isLogged ? (
    isAdmin ? (
      <AdminContent />
    ) : (
      <UserContent />
    )
  ) : (
    <StandardContent />
  );

  return <section>{contentForm}</section>;
};
export default Content;
