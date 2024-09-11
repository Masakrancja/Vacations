import React from "react";
import ReactDOM from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";
import StoreProvider from "./StoreProvider";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Router>
        <StoreProvider>
          <App />
        </StoreProvider>
      </Router>
    </CookiesProvider>
  </React.StrictMode>
);
