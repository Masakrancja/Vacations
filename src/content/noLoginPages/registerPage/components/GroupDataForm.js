import React, { useContext } from "react";

import { NoLoginStoreContext } from "../../NoLoginStoreProvider";

const GroupDataForm = () => {
  const {
    groupName,
    setGroupName,
    groupAddress,
    setGroupAddress,
    groupPostalCode,
    setGroupPostalCode,
    groupCity,
    setGroupCity,
    groupNip,
    setGroupNip,
  } = useContext(NoLoginStoreContext);

  const handleGroupName = (e) => {
    setGroupName(e.target.value);
  };
  const handleGroupAddress = (e) => {
    setGroupAddress(e.target.value);
  };
  const handleGroupPostalCode = (e) => {
    setGroupPostalCode(e.target.value);
  };
  const handleGroupCity = (e) => {
    setGroupCity(e.target.value);
  };
  const handleGroupNip = (e) => {
    setGroupNip(e.target.value);
  };

  return (
    <>
      <h5 className="mt-3">Dane firmy</h5>
      <div className="row mt-3">
        <div className="col-md-3 d-none d-md-block">Nazwa</div>
        <div className="col-md-9 col-12">
          <input
            type="text"
            className="form-control"
            value={groupName}
            onChange={handleGroupName}
            placeholder="Podaj nazwę firmy"
          />
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-md-3 d-none d-md-block">Adres</div>
        <div className="col-md-9 col-12">
          <input
            type="text"
            className="form-control"
            value={groupAddress}
            onChange={handleGroupAddress}
            placeholder="Podaj adres firmy"
          />
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-md-3 d-none d-md-block">Kod pocztowy</div>
        <div className="col-md-9 col-12">
          <input
            type="text"
            className="form-control"
            value={groupPostalCode}
            onChange={handleGroupPostalCode}
            placeholder="Podaj kod pocztowy firmy"
          />
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-md-3 d-none d-md-block">Miasto</div>
        <div className="col-md-9 col-12">
          <input
            type="text"
            className="form-control"
            value={groupCity}
            onChange={handleGroupCity}
            placeholder="Podaj miasto firmy"
          />
        </div>
      </div>

      <div className="row mt-1">
        <div className="col-md-3 d-none d-md-block">NIP</div>
        <div className="col-md-9 col-12">
          <input
            type="text"
            className="form-control"
            value={groupNip}
            onChange={handleGroupNip}
            placeholder="Podaj NIP firmy"
          />
        </div>
      </div>
    </>
  );
};
export default GroupDataForm;
