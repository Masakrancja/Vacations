import React from "react";
import { Routes, Route } from "react-router-dom";

import NoLoginStoreProvider from "./NoLoginStoreProvider";
import RegisterPage from "./registerPage/RegisterPage";
import GroupsPage from "./groupsPage/GroupsPage";
import ErrorPage from "../sharedPages/errorPage/ErrorPage";

const NoLoginPages = () => {
  return (
    <section>
      <NoLoginStoreProvider>
        <Routes>
          <Route path="/" Component={GroupsPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/groups" Component={GroupsPage} />
          <Route path="*" Component={ErrorPage} />
        </Routes>
      </NoLoginStoreProvider>
    </section>
  );
};
export default NoLoginPages;
