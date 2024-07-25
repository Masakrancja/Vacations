import React, { useContext } from "react";
import BemCssModules from "bem-css-modules";

import { StandardStoreContext } from "../../../StandardStoreProvider";

import { default as RegisterPageStyles } from "../RegisterPage.module.scss";

const style = BemCssModules(RegisterPageStyles);

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
  } = useContext(StandardStoreContext);

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
    <section>
      <input
        type="text"
        value={groupName}
        onChange={handleGroupName}
        placeholder="Podaj nazwę firmy"
      />
      <input
        type="text"
        value={groupAddress}
        onChange={handleGroupAddress}
        placeholder="Podaj adres firmy"
      />
      <input
        type="text"
        value={groupPostalCode}
        onChange={handleGroupPostalCode}
        placeholder="Podaj kod pocztowy firmy"
      />
      <input
        type="text"
        value={groupCity}
        onChange={handleGroupCity}
        placeholder="Podaj miasto firmy"
      />
      <input
        type="text"
        value={groupNip}
        onChange={handleGroupNip}
        placeholder="Podaj NIP firmy"
      />
    </section>
  );
};
export default GroupDataForm;
