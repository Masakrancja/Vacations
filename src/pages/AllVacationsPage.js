import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import URI from "../uri";
import Vacations from "../components/Vacations";

const MyVacationPage = () => {
  const [cookie, setCookie] = useCookies(["tokenApi"]);
  const navigate = useNavigate();
  const [me, setMe] = useState({});
  const [message, setMessage] = useState("");
  if (cookie.tokenApi === undefined) {
    navigate("/login");
    window.location.reload();
  }
  const token = cookie.tokenApi;

  useEffect(() => {
    fetch(URI + "/auth?token=" + token)
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "OK") {
          setMe(response.response);
          setMessage("");
        } else {
          setMessage(response.message);
        }
      });
  }, [token]);

  console.log(me);

  return (
    <>
      <Vacations isAdmin={me.isAdmin} id={me.id} which="all" />
    </>
  );
};
export default MyVacationPage;
