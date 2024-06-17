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
  const [tokenApi, setTokenApi] = useState(undefined);
  let credentials = {};

  if (tokenApi !== cookie.tokenApi) {
    setTokenApi(cookie.tokenApi);
  }

  if (cookie.tokenApi !== undefined) {
    fetch(URI + "/auth?token=" + cookie.tokenApi)
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "OK") {
          credentials = {
            groupId: response.response.groupId,
            id: response.response.id,
            isActive: response.response.isActive,
            isAdmin: response.response.isAdmin,
            login: response.response.login,
            tokenApi: cookie.tokenApi,
          };
        }
      });
    if (isAdmin === 1 && credentials.isAdmin === 0) {
      setIsAdmin(0);
    }
    if (isAdmin === 0 && credentials.isAdmin === 1) {
      setIsAdmin(1);
    }
  } else {
    if (isAdmin === 1) {
      setIsAdmin(0);
    }
  }

  return (
    <div>
      <Main credentials={credentials} isAdmin={isAdmin} tokenApi={tokenApi} />
    </div>
  );
};

export default App;
