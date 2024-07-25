import React from "react";
import { Routes, Route } from "react-router-dom";

import UserStoreProvider from "./UserStoreProvider";
import AddEventPage from "./pages/addEventPage/AddEventPage";
import ErrorPage from "../errorPage/ErrorPage";

const UserContent = () => {
  return (
    <section>
      <UserStoreProvider>
        <Routes>
          <Route path="/events/add" Component={AddEventPage} />
          <Route path="*" Component={ErrorPage} />
        </Routes>
      </UserStoreProvider>
    </section>
  );
};
export default UserContent;
