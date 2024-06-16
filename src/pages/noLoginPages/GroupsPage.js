import { useEffect, useState } from "react";
import URI from "../../uri";
import Error from "../../components/Error";
import Groups from "../../components/Groups";
const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(URI + "/groups")
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "OK") {
          setGroups(response.response);
          setMessage("");
        } else {
          setMessage(response.error);
        }
      });
  }, []);

  const listGroups = groups.map((item) => (
    <div key={item.id}>
      <Groups name={item.name} id={item.id} />
    </div>
  ));

  return (
    <div>
      {listGroups}
      <Error message={message} />
    </div>
  );
};
export default GroupsPage;
