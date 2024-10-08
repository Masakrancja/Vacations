import React, { useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../../../StoreProvider";
import { URI } from "../../../../config";
import Error from "../../error/Error";
import Success from "../../success/Success";
import SelectReason from "../../selectReason/SelectReason";
import Loader from "../../loader/Loader";

const EventEdit = ({ event, setEvent }) => {
  const { token, setToken, setIsLogged, setIsAdmin, setValidAt } =
    useContext(StoreContext);
  const [dateFrom, setDateFrom] = useState(event.dateFrom);
  const [dateTo, setDateTo] = useState(event.dateTo);
  const [notice, setNotice] = useState(event.notice);
  const [reasonId, setReasonId] = useState(event.reasonId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleChangeFrom = (e) => {
    setDateFrom(e.target.value);
  };

  const handleChangeTo = (e) => {
    setDateTo(e.target.value);
  };

  const handleChangeNotice = (e) => {
    setNotice(e.target.value);
  };

  const handleSubmit = (e) => {
    setError(false);
    setSuccess(false);
    setLoading(true);
    e.preventDefault();
    (async () => {
      try {
        const { id } = event;
        const options = {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            dateFrom,
            dateTo,
            notice,
            reasonId,
          }),
        };
        console.log(options);
        console.log(id);

        const response = await fetch(URI + "/events/" + id, options);
        const data = await response.json();

        if (data.status === "OK") {
          setEvent(data.response);
          setSuccess(true);
          setMessage("Poprawnie zapisano urlop");
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
    <div className="mb-2 p-2">
      <form method="POST" onSubmit={handleSubmit}>
        <SelectReason id={reasonId} setReasonId={setReasonId} />
        <label className="mt-1">
          Data od:
          <input
            className="form-control"
            type="date"
            value={dateFrom}
            onChange={handleChangeFrom}
          />
        </label>
        <label className="mt-1">
          Data do:
          <input
            className="form-control"
            type="date"
            value={dateTo}
            onChange={handleChangeTo}
          />
        </label>
        <label className="mt-1">
          Notatka:
          <textarea
            className="form-control"
            value={notice}
            onChange={handleChangeNotice}
          ></textarea>
        </label>
        <div className="text-center">
          <button className="btn btn-sm btn-outline-primary" type="submit">
            Zapisz
          </button>
        </div>
      </form>
      {error ? <Error message={message} /> : null}
      {success ? <Success message={message} /> : null}
      {loading ? <Loader /> : null}
    </div>
  );
};
export default EventEdit;
