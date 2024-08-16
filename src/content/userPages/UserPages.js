import React from "react";
import { Routes, Route } from "react-router-dom";

import AddEventPage from "./addEventPage/AddEventPage";
import AllEventsPage from "./allEventsPage/AllEventsPage";
import PendingEventsPage from "./pendingEventPage/PendingEventsPage";
import ApprovedEventsPage from "./approvedEventPage/ApprovedEventsPage";
import CancelledEventsPage from "./cancelledEventPage/CancelledEventsPage";
import AccountPage from "../sharedPages/accountPage/AccountPage";
import ErrorPage from "../sharedPages/errorPage/ErrorPage";

const UserPages = () => {
  return (
    <section>
      <Routes>
        <Route path="/" Component={AllEventsPage} />
        <Route path="/events/add" Component={AddEventPage} />
        <Route path="/events" Component={AllEventsPage} />
        <Route path="/events/pending" Component={PendingEventsPage} />
        <Route path="/events/approved" Component={ApprovedEventsPage} />
        <Route path="/events/cancelled" Component={CancelledEventsPage} />
        <Route path="/me" Component={AccountPage} />
        <Route path="*" Component={ErrorPage} />
      </Routes>
    </section>
  );
};
export default UserPages;
