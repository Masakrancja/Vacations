import React, { useEffect, useState } from "react";
import { URI } from "../../../config";
import Error from "../../components/error/Error";
import Group from "../../components/group/Group";
import Loader from "../../components/loader/Loader";

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
      <div className="col" key={group.id}>
        <Group {...group} />
      </div>
    ))
  );

  return (
    <>
      <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 mb-5">
        {groupView}
      </div>
      {loading ? <Loader /> : null}
    </>
  );
};
export default GroupsPage;
