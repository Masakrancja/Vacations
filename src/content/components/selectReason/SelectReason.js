import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";

import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import Error from "../error/Error";
import Loader from "../loader/Loader";

import { default as SelectReasonStyle } from "./SelectReason.module.scss";

const style = BemCssModules(SelectReasonStyle);

const SelectReason = ({ id, setReasonId }) => {
  const { token, setToken, setIsLogged, setIsAdmin, setValidAt } =
    useContext(StoreContext);
  const [reasons, setReasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const options = {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        };
        const response = await fetch(URI + "/reasons", options);
        const data = await response.json();
        if (data.status === "OK") {
          const reasonId = id || data.response[0].id;
          setReasonId(reasonId);
          setError(false);
          setMessage("");
          setReasons(data.response);
        } else {
          if (data.code === 401) {
            setIsLogged(false);
            setIsAdmin(false);
            setToken("");
            setValidAt("");
            removeCookie("isLogged", { path: "/" });
            removeCookie("isAdmin", { path: "/" });
            removeCookie("token", { path: "/" });
            removeCookie("validAt", { path: "/" });
            navigate("/");
          } else {
            setError(true);
            setMessage(data.message);
          }
        }
      } catch (error) {
        setError(true);
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    })();
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

  if (loading) {
    return <Loader />;
  }

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
