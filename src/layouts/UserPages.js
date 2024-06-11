import React from "react";
import { Routes, Route } from "react-router-dom";
import AddVacationPage from "../pages/userPages/AddVacationPage";
import AllVacationsPage from "../pages/AllVacationsPage";
import WaitingVacationsPage from "../pages/WaitingVacationsPage";
import ApprovedVacationsPage from "../pages/ApprovedVacationsPage";
import RejectedVacationsPage from "../pages/RejectedVacationsPage";
import MyAccountPage from "../pages/MyAccountPage";
import LogoutPage from "../pages/LogoutPage";
import ErrorPage from "../pages/ErrorPage";

const UserPages = () => {
  return (
    <Routes>
      <Route path="/event/add" Component={AddVacationPage} />
      <Route path="/events" Component={AllVacationsPage} />
      <Route path="/events/waiting" Component={WaitingVacationsPage} />
      <Route path="/events/approved" Component={ApprovedVacationsPage} />
      <Route path="/events/rejected" Component={RejectedVacationsPage} />
      <Route path="/me" Component={MyAccountPage} />
      <Route path="/logout" Component={LogoutPage} />
      <Route path="*" Component={ErrorPage} />
    </Routes>
  );
};
export default UserPages;
