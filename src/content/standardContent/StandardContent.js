import React from "react";
import { Routes, Route } from "react-router-dom";

import StandardStoreProvider from "./StandardStoreProvider";
import RegisterPage from "./pages/register/RegisterPage";
import GroupsPage from "./pages/groups/GroupsPage";
import ErrorPage from "../errorPage/ErrorPage";

const StandardContent = () => {
  return (
    <section>
      <StandardStoreProvider>
        <Routes>
          <Route path="/" Component={GroupsPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/groups" Component={GroupsPage} />
          <Route path="*" Component={ErrorPage} />
        </Routes>
      </StandardStoreProvider>
    </section>
  );
};
export default StandardContent;
