import React, { useContext, useState } from "react";
import BemCssModule from "bem-css-modules";

import { StoreContext } from "../../../../StoreProvider";

import { URI } from "../../../../config";
import Error from "../error/Error";

import { default as EventChangeStatusStyle } from "./EventChangeStatus.module.scss";

const style = BemCssModule(EventChangeStatusStyle);

const EventChangeStatus = ({ id, status, setStatusName }) => {
  const { token } = useContext(StoreContext);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
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
        if (data.code === 200) {
          setError(false);
          setMessage("");
          setStatusName(
            e.target.value === "pending"
              ? "Oczekuje na zatwierdzenie"
              : e.target.value === "cancelled"
              ? "Anulowany"
              : "Zatwierdzony"
          );
        } else {
          setError(error);
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
