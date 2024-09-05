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
      <div className="row mt-4">
        <div className="col-1"></div>
        <div className="col-2">Nazwa</div>
        <div className="col-2">
          <input
            type="text"
            value={groupName}
            onChange={handleGroupName}
            placeholder="Podaj nazwę firmy"
          />
        </div>
        <div className="col"></div>
      </div>

      <div className="row mt-1">
        <div className="col-1"></div>
        <div className="col-2">Adres</div>
        <div className="col-2">
          <input
            type="text"
            value={groupAddress}
            onChange={handleGroupAddress}
            placeholder="Podaj adres firmy"
          />
        </div>
        <div className="col"></div>
      </div>

      <div className="row mt-1">
        <div className="col-1"></div>
        <div className="col-2">Kod pocztowy</div>
        <div className="col-2">
          <input
            type="text"
            value={groupPostalCode}
            onChange={handleGroupPostalCode}
            placeholder="Podaj kod pocztowy firmy"
          />
        </div>
        <div className="col"></div>
      </div>

      <div className="row mt-1">
        <div className="col-1"></div>
        <div className="col-2">Miasto</div>
        <div className="col-2">
          <input
            type="text"
            value={groupCity}
            onChange={handleGroupCity}
            placeholder="Podaj miasto firmy"
          />
        </div>
        <div className="col"></div>
      </div>

      <div className="row mt-1">
        <div className="col-1"></div>
        <div className="col-2">NIP</div>
        <div className="col-2">
          <input
            type="text"
            value={groupNip}
            onChange={handleGroupNip}
            placeholder="Podaj NIP firmy"
          />
        </div>
        <div className="col"></div>
      </div>
    </>
  );
};
export default GroupDataForm;
