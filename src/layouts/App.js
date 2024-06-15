import React from "react";
import Main from "./Main";

// const credentials = {
//   groupId: 3,
//   id: 18,
//   isActive: 1,
//   isAdmin: 1,
//   login: "wania12",
//   tokenApi: "9df3c0e13fed7a778cdf97fb778124ff",
// };
const credentials = {};

const App = () => {
  return (
    <div>
      <Main credentials={credentials} />
    </div>
  );
};

export default App;
