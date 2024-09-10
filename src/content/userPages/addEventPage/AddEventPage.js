import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BemCssModules from "bem-css-modules";

import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import SelectReason from "../../components/selectReason/SelectReason";
import SelectData from "../../components/selectData/SelectData";
import Notice from "../../components/notice/Notice";
import Error from "../../components/error/Error";
import Success from "../../components/success/Success";

import { default as LoaderStyles } from "../../../Loader.module.scss";

const styleLoader = BemCssModules(LoaderStyles);

const AddEventPage = () => {
  const today = new Date().toISOString().substring(0, 10);
  const {
    token,
    setToken,
    setIsLogged,
    setIsAdmin,
    setValidAt,
    event,
    setEvent,
  } = useContext(StoreContext);
  const [reasonId, setReasonId] = useState(null);
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    setMessage("");
    setEvent({
      reasonId,
      dateFrom,
      dateTo,
      notice,
    });
  }, [reasonId, dateFrom, dateTo, notice]);

  const handleOnSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    (async () => {
      try {
        const options = {
          method: "POST",
          headers: { Authorization: "Bearer " + token },
          body: JSON.stringify(event),
        };
        const response = await fetch(URI + "/events", options);
        const data = await response.json();
        if (data.status === "OK") {
          setError(false);
          navigate("/events/pending");
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
  };

  return (
    <>
      {loading ? <div className={styleLoader()}></div> : null}
      <h2>Dodaj urlop</h2>
      <div className="card border-primary mx-auto mb-3">
        {/* <div className="card-header">Header</div> */}

        <div className="card-body">
          <form method="POST" onSubmit={handleOnSubmit}>
            <SelectReason id={reasonId} setReasonId={setReasonId} />
            <SelectData
              dateFrom={dateFrom}
              dateTo={dateTo}
              setDateFrom={setDateFrom}
              setDateTo={setDateTo}
            />
            <Notice notice={notice} setNotice={setNotice} />
            <div className="text-center pt-3">
              <button className="btn btn-primary" type="submit">
                Dodaj
              </button>
            </div>
          </form>
          {error ? <Error message={message} /> : <Success message={message} />}
        </div>
      </div>
    </>
  );
};
export default AddEventPage;
