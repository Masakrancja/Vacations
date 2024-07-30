import React, { useContext, useState } from "react";
import BemCssModules from "bem-css-modules";
import { StoreContext } from "../../../../../StoreProvider";
import { UserStoreContext } from "../../UserStoreProvider";
import { URI } from "../../../../../config";
import SelectReason from "../../../components/selectReason/SelectReason";
import SelectData from "../../../components/selectData/SelectData";
import Notice from "../../../components/notice/Notice";
import Error from "../../../components/error/Error";
import Success from "../../../components/success/Success";

import { default as AddEventStyles } from "./AddEventPage.module.scss";

const style = BemCssModules(AddEventStyles);

const AddEventPage = () => {
  const { token } = useContext(StoreContext);
  const { reasonId, dateFrom, dateTo, notice } = useContext(UserStoreContext);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const handleOnSubmit = (e) => {
    e.preventDefault();
    (async () => {
      const options = {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
        body: JSON.stringify({
          reasonId,
          dateFrom,
          dateTo,
          notice,
        }),
      };
      return fetch(URI + "/events", options);
    })()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code === 201) {
          setError(false);
          setMessage("Poprawnie dodano urlop");
        } else {
          setError(true);
          setMessage(data.message);
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(err.message);
      });
  };

  return (
    <section className={style()}>
      <h2>Dodaj urlop</h2>
      <form method="POST" onSubmit={handleOnSubmit}>
        <SelectReason />
        <SelectData />
        <Notice />
        <button type="submit">Dodaj</button>
      </form>
      {error ? <Error message={message} /> : <Success message={message} />}
    </section>
  );
};
export default AddEventPage;
