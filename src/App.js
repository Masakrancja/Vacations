import React, { useContext } from "react";
import { StoreContext } from "./StoreProvider";

import Header from "./header/Header";
import Menu from "./menu/Menu";
import Content from "./content/Content";
import Footer from "./footer/Footer";

const App = () => {
  const { loading } = useContext(StoreContext);
  return (
    <>
      <div className="container-fluid p-0 m-0">
        <Header />
        <main className="row mx-2 mb-4">
          <Menu />
          <Content />
        </main>
        <Footer />
      </div>
      {loading ? (
        <div className="position-absolute top-50 start-50 translate-middle">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default App;
