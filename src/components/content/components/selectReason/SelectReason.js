import React, { useContext, useState, useEffect } from "react";
import BemCssModules from "bem-css-modules";

import { StoreContext } from "../../../../StoreProvider";
import { URI } from "../../../../config";
import Error from "../error/Error";
import { default as SelectReasonStyle } from "./SelectReason.module.scss";

const style = BemCssModules(SelectReasonStyle);

const SelectReason = () => {
  const { token } = useContext(StoreContext);
  const [reasons, setReasons] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      };
      return await fetch(URI + "/reasons", options);
    })()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code === 200) {
          setError(false);
          setMessage("");
          setReasons(data.response);
        } else {
          setError(true);
          setMessage(`Błąd: ${data.code} ${data.messsage}`);
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(`Błąd: ${err.message}`);
      });
  }, [token]);

  const reasonsItems = reasons.map((reason) => (
    <option key={reason.id} value={reason.id}>
      {reason.name}
    </option>
  ));

  return (
    <div>
      {error ? (
        <Error message={message} />
      ) : (
        <>
          <span>Wybierz powód</span>
          <select>{reasonsItems}</select>
        </>
      )}
    </div>
  );
};
export default SelectReason;
