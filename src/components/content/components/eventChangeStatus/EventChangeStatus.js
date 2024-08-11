import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModule from "bem-css-modules";

import { StoreContext } from "../../../../StoreProvider";
import { UserStoreContext } from "../../userContent/UserStoreProvider";
import { URI } from "../../../../config";
import Error from "../error/Error";

import { default as EventChangeStatusStyle } from "./EventChangeStatus.module.scss";

const style = BemCssModule(EventChangeStatusStyle);

const EventChangeStatus = ({ id, status }) => {
  const { token, setToken, setIsLogged, setIsAdmin, setIsValid } =
    useContext(StoreContext);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleChangeStatus = (e) => {
    (async () => {
      const options = {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          status: e.target.value,
        }),
      };
      return await fetch(URI + "/events/" + id, options);
    })()
      .then((res) => {
        return res.json();
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
        }
        if (data.code === 200) {
          setError(false);
          setMessage("");
        } else {
          setError(true);
          setMessage(data.message);
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(err.message);
      });
  };

  return (
    <div className={style()}>
      <label>
        <input
          type="radio"
          name={`status${id}`}
          defaultChecked={status === "pending"}
          value="pending"
          onChange={handleChangeStatus}
        />
        Oczekuje na zatwierdzenie
      </label>
      <label>
        <input
          type="radio"
          name={`status${id}`}
          defaultChecked={status === "approved"}
          value="approved"
          onChange={handleChangeStatus}
        />
        Zatwierdzony
      </label>
      <label>
        <input
          type="radio"
          name={`status${id}`}
          defaultChecked={status === "cancelled"}
          value="cancelled"
          onChange={handleChangeStatus}
        />
        Anulowany
      </label>
      {error ? <Error message={message} /> : null}
    </div>
  );
};
export default EventChangeStatus;
