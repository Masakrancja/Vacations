import React, { useState, useEffect, useContext } from "react";

import { NoLoginStoreContext } from "../../NoLoginStoreProvider";
import { URI } from "../../../../config";
import Error from "../../../components/error/Error";
import Loader from "../../../components/loader/Loader";

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
        {`${group.name} - NIP: ${group.nip}`}
      </option>
    ))
  );

  const handleOnChange = (e) => {
    setGroupId(Number(e.target.value));
  };

  return (
    <div className="row mt-4">
      <div className="col-md-3 d-none d-md-block">Wybierz firmę</div>
      <div className="col-md-9 col-12">
        <select
          className="form-select"
          aria-label="wybierz firmę"
          onChange={handleOnChange}
        >
          {groupView}
        </select>
      </div>
      {loading ? <Loader /> : null}
    </div>
  );
};
export default SelectDataForm;
