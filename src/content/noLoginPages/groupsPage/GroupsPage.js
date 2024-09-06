import React, { useEffect, useState } from "react";
import BemCssModules from "bem-css-modules";
import { URI } from "../../../config";
import Error from "../../components/error/Error";
import Group from "../../components/group/Group";

import { default as LoaderStyles } from "../../../Loader.module.scss";

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
        let response = await fetch(URI + "/groups", options);
        let data = await response.json();
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
    groups.map((group) => (
      <div key={group.id}>
        <Group {...group} />
      </div>
    ))
  );

  return (
    <>
      {loading ? <div className={styleLoader()}></div> : null}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        {groupView}
      </div>
    </>
  );
};
export default GroupsPage;
