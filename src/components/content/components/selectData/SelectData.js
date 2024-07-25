import React, { useContext } from "react";
import BemCssModules from "bem-css-modules";

import { UserStoreContext } from "../../userContent/UserStoreProvider";
import { default as SelectDataStyle } from "./SelectData.module.scss";

const style = BemCssModules(SelectDataStyle);

const SelectData = () => {
  const { dateFrom, setDateFrom, dateTo, setDateTo } =
    useContext(UserStoreContext);

  const handleDateFromChange = (e) => {
    setDateFrom(e.target.value);
  };

  const handleDateToChange = (e) => {
    setDateTo(e.target.value);
  };

  return (
    <div className={style()}>
      <div>
        <span>Data rozpoczęcia urlopu</span>
        <input type="date" value={dateFrom} onChange={handleDateFromChange} />
      </div>
      <div>
        <span>Data zakończenia urlopu</span>
        <input type="date" value={dateTo} onChange={handleDateToChange} />
      </div>
    </div>
  );
};
export default SelectData;
