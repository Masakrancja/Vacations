import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import SelectReason from "../../components/selectReason/SelectReason";
import SelectData from "../../components/selectData/SelectData";
import Notice from "../../components/notice/Notice";
import Error from "../../components/error/Error";
import Success from "../../components/success/Success";
import Loader from "../../components/loader/Loader";

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
  const [loading, setLoading] = useState(false);
  const [reasonId, setReasonId] = useState(null);
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
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
    setError(false);
    setSuccess(false);
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
          setSuccess(true);
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
      <h2>Dodaj urlop</h2>
      <div className="card border-primary mx-auto mb-3">
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
              {loading ? (
                <button
                  className="btn btn-outline-primary"
                  type="submit"
                  disabled
                >
                  Dodaj
                </button>
              ) : (
                <button className="btn btn-outline-primary" type="submit">
                  Dodaj
                </button>
              )}
            </div>
          </form>
        </div>
        {error ? <Error message={message} /> : null}
        {success ? <Success message={message} /> : null}
        {loading ? <Loader /> : null}
      </div>
    </>
  );
};
export default AddEventPage;
