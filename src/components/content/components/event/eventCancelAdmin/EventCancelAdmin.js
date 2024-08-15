import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../../../../StoreProvider";
import { AdminStoreContext } from "../../../adminContent/AdminStoreProvider";

import { URI } from "../../../../../config";
import Error from "../../error/Error";

const EventCancelAdmin = ({ event }) => {
  const { token, setToken, setIsLogged, setIsAdmin, setIsValid } =
    useContext(StoreContext);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { id, wantCancel } = event;
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleOnClik = () => {
    console.log("click");

    (async () => {
      const options = {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          status: "cancelled",
        }),
      };
      return await fetch(URI + "/events/" + id, options);
    })()
      .then((res) => {
        res.json();
      })
      .then((data) => {
        if (data.code === 401) {
          setIsLogged(false);
          setIsAdmin(false);
          setToken("");
          setIsValid("");
          removeCookie("isLogged", { path: "/" });
          removeCookie("isAdmin", { path: "/" });
          removeCookie("token", { path: "/" });
          removeCookie("isValid", { path: "/" });
          navigate("/");
        } else if (data.code === 200) {
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(err.message);
      });
  };

  return (
    <>
      <h6>Pracownik wysłał prośbę o anulowanie urlopu</h6>
      {wantCancel ? <button onClick={handleOnClik}>Anuluj</button> : null}
    </>
  );
};
export default EventCancelAdmin;
