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
  // let cookies = document.cookie.split(";");
  // cookie = cookies.find((item) => {
  //   const pos = item.indexOf("=");
  //   if (pos >= 0) {
  //     return item.substr(1 * pos + 1);
  //   }
  //   return "";
  // });

  // console.log("cookie : " + cookie);

  return (
    <div>
      <Main credentials={credentials} />
    </div>
  );
};

export default App;
