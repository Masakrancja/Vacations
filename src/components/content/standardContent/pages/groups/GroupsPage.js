import React, { useEffect, useState } from "react";
import BemCssModules from "bem-css-modules";
import request from "../../../../../request";
import Error from "../../../components/Error/Error";

import { default as GroupsPageStyles } from "./GroupsPage.module.scss";

const style = BemCssModules(GroupsPageStyles);

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await request.get("/groups");
        if (res.status === 200) {
          setGroups(res.data.response);
        } else {
          setError(true);
          setMessage(`Błąd: ${res.status} ${res.statusText}`);
        }
      } catch (err) {
        setError(true);
        setMessage(`Błąd: ${err.message}`);
      }
    })();
  }, []);

  const groupView = error ? (
    <Error message={message} />
  ) : (
    groups.map((group) => <li key={group.id}>{group.name}</li>)
  );

  return <>{groupView}</>;
};
export default GroupsPage;
