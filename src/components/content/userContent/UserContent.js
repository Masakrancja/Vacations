import React from "react";
import { Routes, Route } from "react-router-dom";

import AddEventPage from "./pages/addEventPage/AddEventPage";
import AllEventsPage from "./pages/allEventsPage/AllEventsPage";
import PendingEventsPage from "./pages/pendingEventPage/PendingEventsPage";
import ApprovedEventsPage from "./pages/approvedEventPage/ApprovedEventsPage";
import CancelledEventsPage from "./pages/cancelledEventPage/CancelledEventsPage";
import AccountPage from "./pages/accountPage/AccountPage";
import ErrorPage from "../errorPage/ErrorPage";

const UserContent = () => {
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
export default UserContent;
