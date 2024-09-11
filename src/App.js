import React from "react";

import Header from "./header/Header";
import Menu from "./menu/Menu";
import Content from "./content/Content";
import Footer from "./footer/Footer";

const App = () => {
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
    </>
  );
};
export default App;
