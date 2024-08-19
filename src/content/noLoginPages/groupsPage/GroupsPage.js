import React, { useEffect, useState } from "react";
import BemCssModules from "bem-css-modules";
import { URI } from "../../../config";
import Error from "../../components/error/Error";

import { default as GroupsPageStyles } from "./GroupsPage.module.scss";
import { default as LoaderStyles } from "../../../Loader.module.scss";

const style = BemCssModules(GroupsPageStyles);
const styleLoader = BemCssModules(LoaderStyles);

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const options = {
          method: "GET",
        };
        const response = await fetch(URI + "/groups", options);
        const data = await response.json();
        if (data.status === "OK") {
          setGroups(data.response);
        } else {
          setError(true);
          setMessage(data.message);
        }
      } catch (error) {
        setError(true);
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const groupView = error ? (
    <Error message={message} />
  ) : (
    groups.map((group) => <li key={group.id}>{group.name}</li>)
  );

  return (
    <>
      {loading ? <div className={styleLoader()}></div> : null}
      <div className={style()}>{groupView}</div>
    </>
  );
};
export default GroupsPage;
