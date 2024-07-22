import React from "react";
import { CookiesProvider } from "react-cookie";
import StoreProvider from "./StoreProvider";
import Header from "./components/header/Header";
import "./App.scss";

function App() {
  return (
    <CookiesProvider>
      <StoreProvider>
        <div className="container">
          <Header/>
        </div>
      </StoreProvider>
    </CookiesProvider>
  )
}

export default App;
