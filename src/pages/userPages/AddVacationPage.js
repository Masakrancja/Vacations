import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import SelectReasons from "../../components/SelectReasons";
import RegisterEvent from "../../components/RegisterEvent";
import { eventContext } from "../../context/eventContext";
import URI from "../../uri";
import Error from "../../components/Error";
import Success from "../../components/Success";

const AddVacationPage = () => {
  const [cookie] = useCookies(["tokenApi"]);
  const navigate = useNavigate();
  if (cookie.tokenApi === undefined) {
    window.location.reload();
    navigate("/login");
  }

  const [reasonId, setReasonId] = useState(eventContext.reasonId);
  const [dateFrom, setDateFrom] = useState(eventContext.dateFrom);
  const [dateTo, setDateTo] = useState(eventContext.dateTo);
  const [notice, setNotice] = useState(eventContext.notice);

  const [message, setMessage] = useState("");
  const [register, setRegister] = useState(false);

  const handleReasonIdChange = (e) => {
    const value = Number(e.target.value);
    eventContext.reasonId = value;
    setReasonId(value);
  };

  const handleDateFromChange = (e) => {
    const value = e.target.value;
    eventContext.dateFrom = value;
    setDateFrom(value);
  };

  const handleDateToChange = (e) => {
    const value = e.target.value;
    eventContext.dateTo = value;
    setDateTo(value);
  };

  const handleNoticeChange = (e) => {
    const value = e.target.value;
    eventContext.notice = value;
    setNotice(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    let hasError = false;

    //Jakaś walidacja po stronie frontu
    if (cookie.tokenApi === undefined) {
      hasError = true;
      setMessage("Sesja wysgasła. Zaloguj się ponownie");
    }

    if (!hasError) {
      const options = {
        method: "POST",
        body: JSON.stringify(eventContext),
      };

      fetch(URI + "/events?token=" + cookie.tokenApi, options)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.status === "OK") {
            setRegister(true);
            setMessage("Urlop został utworzony");
            clearEventForm();
            clearEventData();
            return navigate("/events/waiting");
          } else {
            setRegister(false);
            setMessage(response.message);
          }
        });
    }
  };

  const clearEventData = () => {
    eventContext.reasonId = 0;
    eventContext.dateFrom = "";
    eventContext.dateTo = "";
    eventContext.notice = "";
  };

  const clearEventForm = () => {
    setReasonId(0);
    setDateFrom("");
    setDateTo("");
    setNotice("");
  };

  return (
    <div>
      <h1>Dodaj urlop</h1>
      <form onSubmit={handleSubmit}>
        <SelectReasons
          reasonId={reasonId}
          handleReasonIdChange={handleReasonIdChange}
        />
        <RegisterEvent
          dateFrom={dateFrom}
          dateTo={dateTo}
          notice={notice}
          handleDateFromChange={handleDateFromChange}
          handleDateToChange={handleDateToChange}
          handleNoticeChange={handleNoticeChange}
        />
        <button type="submit">Utwórz</button>
      </form>
      {register ? <Success message={message} /> : <Error message={message} />}
    </div>
  );
};
export default AddVacationPage;
