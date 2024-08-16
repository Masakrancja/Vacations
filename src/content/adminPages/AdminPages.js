import React from "react";
import { Routes, Route } from "react-router-dom";

import UsersPage from "./usersPage/UsersPage";
import UsersPendingPage from "./usersPendingPage/UsersPendingPage";
import EventsPage from "./eventsPage/EventsPage";
import EventsPendingPage from "./eventsPendingPage/EventsPendingPage";
import EventsApprovedPage from "./eventsApprovedPage/EventsApprovedPage";
import EventsCancelledPage from "./eventsCancelledPage/EventsCancelledPage";
import EventsPetitionsPage from "./eventsPetitionsPage/EventsPetitionsPage";
import AccountPage from "../sharedPages/accountPage/AccountPage";
import ErrorPage from "../sharedPages/errorPage/ErrorPage";

const AdminPages = () => {
  return (
    <section>
      <Routes>
        <Route path="/" Component={UsersPage} />
        <Route path="/users" Component={UsersPage} />
        <Route path="/users/pending" Component={UsersPendingPage} />
        <Route path="/events" Component={EventsPage} />
        <Route path="/events/pending" Component={EventsPendingPage} />
        <Route path="/events/approved" Component={EventsApprovedPage} />
        <Route path="/events/cancelled" Component={EventsCancelledPage} />
        <Route path="/events/petitions" Component={EventsPetitionsPage} />
        <Route path="/me" Component={AccountPage} />
        <Route path="*" Component={ErrorPage} />
      </Routes>
    </section>
  );
};
export default AdminPages;
