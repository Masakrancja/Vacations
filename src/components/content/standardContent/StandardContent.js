import React from "react";
import { Routes, Route } from "react-router-dom";

import StoreProvider from "./StoreProvider";
import RegisterPage from "./pages/register/RegisterPage";
import GroupsPage from "./pages/groups/GroupsPage";
import ErrorPage from "../errorPage/ErrorPage";

const StandardContent = () => {
  return (
    <section>
      <StoreProvider>
        <Routes>
          <Route path="/register" Component={RegisterPage} />
          <Route path="/groups" Component={GroupsPage} />
          <Route path="*" Component={ErrorPage} />
        </Routes>
      </StoreProvider>
    </section>
  );
};
export default StandardContent;
