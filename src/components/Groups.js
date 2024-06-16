import React, { useState, useEffect } from "react";
import URI from "../uri";
import Error from "./Error";
const Groups = ({ id, name }) => {
  const [group, setGroup] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(URI + "/groups/" + id)
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "OK") {
          setGroup(response.response);
          setMessage("");
        } else {
          setMessage(response.error);
        }
      });
  }, [id]);

  return (
    <div>
      <h3>{name}</h3>
      <ul>
        <li>
          Ulica: <span>{group.address}</span>
        </li>
        <li>
          Kod pocztowy: <span>{group.postalCode}</span>
        </li>
        <li>
          Miasto: <span>{group.city}</span>
        </li>
        <li>
          NIP: <span>{group.nip}</span>
        </li>
      </ul>
      <Error message={message} />
    </div>
  );
};
export default Groups;
