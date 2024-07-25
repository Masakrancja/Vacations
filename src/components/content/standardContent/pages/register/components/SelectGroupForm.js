import React, { useState, useEffect, useContext } from "react";
import BemCssModules from "bem-css-modules";

import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../../../../config";
import Error from "../../../../components/Error/Error";

import { default as RegisterPageStyles } from "../RegisterPage.module.scss";

const style = BemCssModules(RegisterPageStyles);

const SelectDataForm = () => {
  const { setGroupId } = useContext(StoreContext);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
      };
      return await fetch(URI + "/groups", options);
    })()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code === 200) {
          setGroups(data.response);
          setGroupId(data.response[0].id);
        } else {
          setError(true);
          setMessage(`Błąd: ${data.code} ${data.message}`);
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(`Błąd: ${err.message}`);
      });
  }, [setGroupId]);

  const groupView = error ? (
    <Error message={message} />
  ) : (
    groups.map((group) => (
      <option key={group.id} value={group.id}>
        {group.name}
      </option>
    ))
  );

  const handleOnChange = (e) => {
    setGroupId(Number(e.target.value));
  };

  return <select onChange={handleOnChange}>{groupView}</select>;
};
export default SelectDataForm;
