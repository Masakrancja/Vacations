import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";
import { StoreContext } from "../../../../../StoreProvider";
import { UserStoreContext } from "../../UserStoreProvider";
import { URI } from "../../../../../config";
import SelectReason from "../../../components/selectReason/SelectReason";
import SelectData from "../../../components/selectData/SelectData";
import Notice from "../../../components/notice/Notice";
import Error from "../../../components/error/Error";
import Success from "../../../components/success/Success";

import { default as AddEventStyles } from "./AddEventPage.module.scss";

const style = BemCssModules(AddEventStyles);

const AddEventPage = () => {
  const { token, setToken, setIsLogged, setIsAdmin, setIsValid } =
    useContext(StoreContext);
  const {
    reasonId,
    setReasonId,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    notice,
    setNotice,
  } = useContext(UserStoreContext);

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().substring(0, 10);
    setReasonId(null);
    setDateFrom(today);
    setDateTo(today);
    setNotice("");
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    (async () => {
      const options = {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
        body: JSON.stringify({
          reasonId,
          dateFrom,
          dateTo,
          notice,
        }),
      };
      return fetch(URI + "/events", options);
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
        }
        if (data.code === 201) {
          setError(false);
          navigate("/events/pending");
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
    <section className={style()}>
      <h2>Dodaj urlop</h2>
      <form method="POST" onSubmit={handleOnSubmit}>
        <SelectReason />
        <SelectData />
        <Notice />
        <button type="submit">Dodaj</button>
      </form>
      {error ? <Error message={message} /> : <Success message={message} />}
    </section>
  );
};
export default AddEventPage;
