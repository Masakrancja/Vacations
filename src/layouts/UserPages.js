import React from "react";
import { Routes, Route } from "react-router-dom";
import AddVacationPage from "../pages/userPages/AddVacationPage";
import MyVacationsPage from "../pages/userPages/MyVacationsPage";

const UserPages = () => {
  return (
    <Routes>
      <Route path="/event/add" Component={AddVacationPage} />
      <Route path="/events/all" Component={MyVacationsPage} />
      <Route path="/" Component={} />
      <Route path="/" Component={} />
      <Route path="/" Component={} />
      <Route path="/" Component={} />
      <Route path="*" Component={ErrorPage} />
    </Routes>
  );
};
export default UserPages;
