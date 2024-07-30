import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../../StoreProvider";
import { URI } from "../../../../config";
import Error from "../error/Error";

import BemCssModules from "bem-css-modules";

import { default as UserStyle } from "./User.module.scss";

const style = BemCssModules(UserStyle);

const User = ({ id }) => {
  const { token } = useContext(StoreContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      };
      return await fetch(URI + "/users/" + id, options);
    })()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.code === 200) {
          setUser(data.response);
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
  }, [token, id]);

  return (
    <div className={style()}>
      {error ? <Error message={message} /> : `User id: ${id}`}
    </div>
  );
};
export default User;
