import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminStoreProvider from "./AdminStoreProvider";

import UsersPage from "./pages/usersPage/UsersPage";
import UsersPendingPage from "./pages/usersPendingPage/UsersPendingPage";
import EventsPage from "./pages/eventsPage/EventsPage";
import AccountPage from "./pages/accountPage/AccountPage";
import ErrorPage from "../errorPage/ErrorPage";

const AdminContent = () => {
  return (
    <section>
      <AdminStoreProvider>
        <Routes>
          <Route path="/" Component={UsersPage} />
          <Route path="/users" Component={UsersPage} />
          <Route path="/users/pending" Component={UsersPendingPage} />
          <Route path="/events" Component={EventsPage} />
          {/*<Route path="/events/pending" Component={} />
          <Route path="/events/approved" Component={} />
          <Route path="/events/cancelled" Component={} /> */}
          <Route path="/me" Component={AccountPage} />
          <Route path="*" Component={ErrorPage} />
        </Routes>
      </AdminStoreProvider>
    </section>
  );
};
export default AdminContent;
