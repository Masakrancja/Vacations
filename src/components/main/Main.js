import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "../header/Header";
import AdminMenu from "../adminMenu/AdminMenu";
import UserMenu from "../userMenu/UserMenu";
import NoLoginMenu from "../noLoginMenu/NoLoginMenu";
import Content from "../content/Content";
import Footer from "../footer/Footer";

import "./main.css";

const Main = (props) => {
  const { isAdmin, tokenApi } = props.credentials;
  return (
    <BrowserRouter>
      <div className="main">
        <Header />
        <main>
          {tokenApi ? (
            <nav>{isAdmin ? <AdminMenu /> : <UserMenu />}</nav>
          ) : (
            <nav>{<NoLoginMenu />}</nav>
          )}
          <section>
            <Content />
          </section>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
export default Main;
