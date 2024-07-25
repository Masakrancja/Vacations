import React, { useEffect, useState } from "react";
import BemCssModules from "bem-css-modules";
import { URI } from "../../../../../config";
import Error from "../../../components/error/Error";

import { default as GroupsPageStyles } from "./GroupsPage.module.scss";

const style = BemCssModules(GroupsPageStyles);

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
      };
      return await fetch(URI + "/groups", options);
    })()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code === 200) {
          setGroups(data.response);
        } else {
          setError(true);
          setMessage(`Błąd: ${data.code} ${data.message}`);
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(`Błąd: ${err.message}`);
      });
  }, []);

  const groupView = error ? (
    <Error message={message} />
  ) : (
    groups.map((group) => <li key={group.id}>{group.name}</li>)
  );

  return <div className={style()}>{groupView}</div>;
};
export default GroupsPage;
