import React, { useState, useEffect, useContext } from "react";
import BemCssModules from "bem-css-modules";

import { NoLoginStoreContext } from "../../NoLoginStoreProvider";
import { URI } from "../../../../config";
import Error from "../../../components/error/Error";

import { default as RegisterPageStyles } from "../RegisterPage.module.scss";
import { default as LoaderStyles } from "../../../../Loader.module.scss";

const style = BemCssModules(RegisterPageStyles);
const styleLoader = BemCssModules(LoaderStyles);

const SelectDataForm = () => {
  const { setGroupId } = useContext(NoLoginStoreContext);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const options = {
          method: "GET",
        };
        const response = await fetch(URI + "/groups", options);
        const data = await response.json();
        if (data.status === "OK") {
          setGroups(data.response);
          setGroupId(data.response[0].id);
        } else {
          setError(true);
          setMessage(data.message);
        }
      } catch (error) {
        setError(true);
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    })();
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

  return (
    <>
      {loading ? <div className={styleLoader()}></div> : null}
      <div className={style()}>
        <select onChange={handleOnChange}>{groupView}</select>
      </div>
    </>
  );
};
export default SelectDataForm;