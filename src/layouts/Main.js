import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import AdminMenu from "./AdminMenu";
import AdminPages from "./AdminPages";
import UserMenu from "./UserMenu";
import UserPages from "./UserPages";
import NoLoginMenu from "./NoLoginMenu";
import NoLoginPages from "./NoLoginPages";
import Footer from "./Footer";

import "./css/main.css";

const Main = ({ isAdmin, tokenApi }) => {
  console.log("isAdmin: ", isAdmin);
  console.log("tokenApi: ", tokenApi);

  return (
    <BrowserRouter>
      <div className="main">
        <Header />
        <main>
          {tokenApi ? (
            <>
              {isAdmin ? (
                <>
                  <nav>
                    <AdminMenu />
                  </nav>
                  <section>
                    <AdminPages />
                  </section>
                </>
              ) : (
                <>
                  <nav>
                    <UserMenu />
                  </nav>
                  <section>
                    <UserPages />
                  </section>
                </>
              )}
            </>
          ) : (
            <>
              <nav>
                <NoLoginMenu />
              </nav>
              <section>
                <NoLoginPages />
              </section>
            </>
          )}
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
export default Main;
