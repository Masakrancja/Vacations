import React from "react";

const RegisterEvent = ({
  dateFrom,
  dateTo,
  notice,
  handleDateFromChange,
  handleDateToChange,
  handleNoticeChange,
}) => {
  return (
    <div>
      <div>
        <label>
          Data rozpoczęcia urlopu
          <input type="date" value={dateFrom} onChange={handleDateFromChange} />
        </label>
      </div>
      <div>
        <label>
          Data zakończenia urlopu
          <input type="date" value={dateTo} onChange={handleDateToChange} />
        </label>
      </div>
      <div>
        <textarea value={notice} onChange={handleNoticeChange} />
      </div>
    </div>
  );
};
export default RegisterEvent;
