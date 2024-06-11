import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/noLoginPages/LoginPage";
import RegisterPage from "../pages/noLoginPages/RegisterPage";
import GroupsPage from "../pages/noLoginPages/GroupsPage";

const NoLoginPages = () => {
  return (
    <Routes>
      <Route path="/login" Component={LoginPage} />
      <Route path="/register" Component={RegisterPage} />
      <Route path="/groups" Component={GroupsPage} />
    </Routes>
  );
};
export default NoLoginPages;
