import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BemCssModules from "bem-css-modules";
import StoreProvider from "./StoreProvider";
import Header from "./components/header/Header";
import Menu from "./components/menu/Menu";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";

import { default as AppStyles } from "./App.module.scss";

const style = BemCssModules(AppStyles);

function App() {
  return (
    <Router>
      <StoreProvider>
        <div className={style()}>
          <Header />
          <main className={style("main")}>
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
