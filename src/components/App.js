import React from "react";
import Main from "./main/Main";

import "./app.css";

const credentials = {
  groupId: 3,
  id: 18,
  isActive: 1,
  isAdmin: 0,
  login: "wania12",
  tokenApi: "9df3c0e13fed7a778cdf97fb778124ff",
};

function App() {
  return (
    <div className="app">
      <Main credentials={credentials} />
    </div>
  );
}

export default App;
