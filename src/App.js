import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import StoreProvider from "./StoreProvider";
import Header from "./header/Header";
import Menu from "./menu/Menu";
import Content from "./content/Content";
import Footer from "./footer/Footer";

function App() {
  return (
    <Router>
      <StoreProvider>
        <div className="container-fluid p-0 m-0">
          <Header />
          <main
            className="row mx-2"
          >
            <Menu />
            <Content />
          </main>
          <Footer />
        </div>
      </StoreProvider>
    </Router>
  );
}
export default App;
