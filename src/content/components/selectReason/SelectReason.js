import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";

import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import Error from "../error/Error";
import { default as SelectReasonStyle } from "./SelectReason.module.scss";

const style = BemCssModules(SelectReasonStyle);

const SelectReason = ({ id, setReasonId }) => {
  const { token, setToken, setIsLogged, setIsAdmin, setIsValid } =
    useContext(StoreContext);
  const [reasons, setReasons] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

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
          const reasonId = id || data.response[0].id;
          setReasonId(reasonId);
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
  }, []);

  const reasonsItems = reasons.map((reason) => (
    <option key={reason.id} value={reason.id}>
      {reason.name}
    </option>
  ));

  const handleReasonChange = (e) => {
    const reasonId = Number(e.target.value);
    setReasonId(reasonId);
  };

  return (
    <div className={style()}>
      {error ? (
        <Error message={message} />
      ) : (
        <>
          <span>Wybierz powód</span>
          <select onChange={handleReasonChange} value={Number(id)}>
            {reasonsItems}
          </select>
        </>
      )}
    </div>
  );
};
export default SelectReason;
