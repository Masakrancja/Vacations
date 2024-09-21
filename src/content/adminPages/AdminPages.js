import React from "react";
import { Routes, Route } from "react-router-dom";

import UsersPage from "./usersPage/UsersPage";
import UsersPendingPage from "./usersPendingPage/UsersPendingPage";
import EventsPendingPage from "./eventsPendingPage/EventsPendingPage";
import EventsApprovedPage from "./eventsApprovedPage/EventsApprovedPage";
import EventsCancelledPage from "./eventsCancelledPage/EventsCancelledPage";
import EventsPetitionsPage from "./eventsPetitionsPage/EventsPetitionsPage";
import AccountPage from "../sharedPages/accountPage/AccountPage";

const AdminPages = () => {
  return (
    <Routes>
      <Route path="/users/all" Component={UsersPage} />
      <Route path="/users/pending" Component={UsersPendingPage} />
      <Route path="/events/pending" Component={EventsPendingPage} />
      <Route path="/events/approved" Component={EventsApprovedPage} />
      <Route path="/events/cancelled" Component={EventsCancelledPage} />
      <Route path="/events/petitions" Component={EventsPetitionsPage} />
      <Route path="/me" Component={AccountPage} />
      <Route path="*" Component={UsersPage} />
    </Routes>
  );
};
export default AdminPages;
