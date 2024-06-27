import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/noLoginPages/LoginPage";
import RegisterPage from "../pages/noLoginPages/RegisterPage";
import GroupsPage from "../pages/noLoginPages/GroupsPage";
import ErrorPage from "../pages/ErrorPage";

const NoLoginPages = () => {
  return (
    <Routes>
      <Route path="/" Component={LoginPage} />
      <Route path="/login" Component={LoginPage} />
      <Route path="/logout" Component={LoginPage} />
      <Route path="/register" Component={RegisterPage} />
      <Route path="/groups" Component={GroupsPage} />
      <Route path="*" Component={ErrorPage} />
    </Routes>
  );
};
export default NoLoginPages;
