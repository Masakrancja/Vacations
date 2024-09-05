import React from "react";
import { Routes, Route } from "react-router-dom";

import NoLoginStoreProvider from "./NoLoginStoreProvider";
import RegisterPage from "./registerPage/RegisterPage";
import GroupsPage from "./groupsPage/GroupsPage";

const NoLoginPages = () => {
  return (
    <NoLoginStoreProvider>
      <Routes>
        <Route path="/register" Component={RegisterPage} />
        <Route path="/groups" Component={GroupsPage} />
        <Route path="*" Component={GroupsPage} />
      </Routes>
    </NoLoginStoreProvider>
  );
};
export default NoLoginPages;
