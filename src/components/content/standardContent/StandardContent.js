import React from "react";
import { Routes, Route } from "react-router-dom";

import RegisterPage from "./pages/register/RegisterPage";
import GroupsPage from "./pages/groups/GroupsPage";
import ErrorPage from "../errorPage/ErrorPage";

const StandardContent = () => {
  return (
    <section>
      <Routes>
        <Route path="/register" Component={RegisterPage} />
        <Route path="/groups" Component={GroupsPage} />
        <Route path="*" Component={ErrorPage} />
      </Routes>
    </section>
  );
};
export default StandardContent;
