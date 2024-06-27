import React, { useState } from "react";
import Main from "./Main";
import { useCookies } from "react-cookie";
import URI from "../uri";

// const credentials = {
//   groupId: 3,
//   id: 18,
//   isActive: 1,
//   isAdmin: 1,
//   login: "wania12",
//   tokenApi: "9df3c0e13fed7a778cdf97fb778124ff",
// };

const App = () => {
  const [cookie, setCookie] = useCookies(["tokenApi"]);
  const [isAdmin, setIsAdmin] = useState(0);
  const [isLogged, setIsLogged] = useState(false);
  let credentials = {};

  console.log("tokenApi:" + cookie.tokenApi);

  if (cookie.tokenApi !== undefined) {
    fetch(URI + "/auth?token=" + cookie.tokenApi)
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "OK") {
          credentials = {
            isAdmin: response.response.isAdmin,
          };
          setIsLogged(true);
          if (isAdmin === 1 && credentials.isAdmin === 0) {
            setIsAdmin(0);
          } else if (isAdmin === 0 && credentials.isAdmin === 1) {
            setIsAdmin(1);
          }
        } else {
          setIsAdmin(0);
          setIsLogged(false);
        }
      });
  }

  return (
    <div>
      <Main isAdmin={isAdmin} isLogged={isLogged} />
    </div>
  );
};

export default App;
