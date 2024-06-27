import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import URI from "../uri";
import Vacation from "./Vacation";
import Error from "./Error";

const Vacations = ({ isAdmin, id, which }) => {
  const [cookie] = useCookies(["tokenApi"]);
  const navigate = useNavigate();
  const [vacations, setVacations] = useState({});
  const [reasons, setReasons] = useState([]);
  const [message, setMessage] = useState("");

  if (cookie.tokenApi === undefined) {
    navigate("/login");
    window.location.reload();
  }

  const getNameOfReason = (reasons, id) => {
    return reasons.filter((item) => item.id === id);
  };

  const token = cookie.tokenApi;

  useEffect(() => {
    fetch(URI + "/events?token=" + token)
      .then((resposne) => resposne.json())
      .then((response) => {
        if (response.status === "OK") {
          setVacations(response.response);
          setMessage("");
        } else {
          setMessage(response.message);
        }
      });
  }, [token]);
  useEffect(() => {
    fetch(URI + "/reasons?token=" + token)
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

  console.log(vacations);
  console.log(reasons);

  //console.log(getNameOfReason(reasons, 1)[0]?.name ?? "");

  //   let listVacations = vacations.map((vacation) => (
  //     <Vacation
  //       vacation={vacation}
  //       reasonName={getNameOfReason(reasons, vacation.reasonId)}
  //     />
  //   ));
  return <></>;
};
export default Vacations;
