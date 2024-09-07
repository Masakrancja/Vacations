import React from "react";

const SelectData = ({ dateFrom, dateTo, setDateFrom, setDateTo }) => {
  const handleDateFromChange = (e) => {
    setDateFrom(e.target.value);
  };

  const handleDateToChange = (e) => {
    setDateTo(e.target.value);
  };

  return (
    <div>
      <div className="mt-2">
        <label>Data rozpoczęcia urlopu</label>
        <input
          className="form-control"
          type="date"
          value={dateFrom}
          onChange={handleDateFromChange}
        />
      </div>
      <div className="mt-2">
        <label>Data zakończenia urlopu</label>
        <input
          className="form-control"
          type="date"
          value={dateTo}
          onChange={handleDateToChange}
        />
      </div>
    </div>
  );
};
export default SelectData;
