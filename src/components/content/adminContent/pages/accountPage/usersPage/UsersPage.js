import React, { useContext, useState, useEffect } from "react";
import BemCssModules from "bem-css-modules";
import { StoreContext } from "../../../../../../StoreProvider";
import { URI } from "../../../../../../config";
import User from "../../../../components/user/User";
import Error from "../../../../components/error/Error";

import { default as UsersStyles } from "./UsersPage.module.scss";

const style = BemCssModules(UsersStyles);

const UsersPage = () => {
  const { token } = useContext(StoreContext);
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
        console.log(data);
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
    .filter((user) => Boolean(user.isAdmin) === false)
    .map((user) => (
      <div key={user.id}>
        <User {...user} />
      </div>
    ));

  return (
    <section className={style()}>
      <h2>Moi pracownicy</h2>
      {error ? <Error message={message} /> : usersContent}
    </section>
  );
};
export default UsersPage;
