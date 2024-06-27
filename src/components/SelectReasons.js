import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import URI from "../uri";
import Error from "./Error";

const SelectReasons = ({ reasonId, handleReasonIdChange }) => {
  const [cookie] = useCookies(["tokenApi"]);
  const navigate = useNavigate();
  const [reasons, setReasons] = useState([]);
  const [message, setMessage] = useState("");

  if (cookie.tokenApi === undefined) {
    navigate("/login");
    window.location.reload();
  }

  const token = cookie.tokenApi;

  useEffect(() => {
    fetch(URI + "/reasons?token=" + String(token))
      .then((resposne) => resposne.json())
      .then((response) => {
        if (response.status === "OK") {
          setReasons(response.response);
          setMessage("");
        } else {
          setMessage(response.message);
        }
      });
  }, [token]);

  const options = [<option key="0" value="0"></option>];
  options.push(
    reasons.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    ))
  );
  if (cookie.tokenApi === undefined) {
    return navigate("/login");
  }
  return (
    <div>
      <label htmlFor="reasons">Wybierz powód urlopu</label>
      <select
        name="reasons"
        id="reasons"
        onChange={handleReasonIdChange}
        value={reasonId}
      >
        {options}
      </select>
      <Error message={message} />
    </div>
  );
};
export default SelectReasons;
