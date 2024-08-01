import React, { useContext, useEffect, useState } from "react";
import BemCssModule from "bem-css-modules";

import { StoreContext } from "../../../../StoreProvider";
import { AdminStoreContext } from "../../adminContent/AdminStoreProvider";
import { URI } from "../../../../config";

import { default as SelectUserStyle } from "./SelectUser.module.scss";

const style = BemCssModule(SelectUserStyle);

const SelectUser = () => {
  const { token } = useContext(StoreContext);
  const { setUserId } = useContext(AdminStoreContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      };
      return await fetch(URI + "/users", options);
    })()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code === 200) {
          setUsers(data.response);
          setError(false);
          setMessage("");
        } else {
          setError(true);
          setMessage(data.message);
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(err.message);
      });
  }, [token]);

  const usersContent = users
    .filter(
      (user) =>
        Boolean(user.isAdmin) === false && Boolean(user.isActive) === true
    )
    .map((user) => (
      <option key={user.id} value={user.id}>
        {user.login}
      </option>
    ));

  const handleOnChange = (e) => {
    setUserId(Number(e.target.value));
  };

  return (
    <section className={style()}>
      <h3>Wybierz pracownika z listy</h3>
      <select onChange={handleOnChange}>
        <option>Wszyscy pracownicy</option>
        {usersContent}
      </select>
    </section>
  );
};
export default SelectUser;
