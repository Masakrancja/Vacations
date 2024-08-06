import React, { useContext, useState, useEffect } from "react";
import BemCssModules from "bem-css-modules";
import { StoreContext } from "../../../../../StoreProvider";
import { URI } from "../../../../../config";
import Account from "../../../components/account/Account";
import Error from "../../../components/error/Error";

import { default as AccountStyles } from "./AccountPage.module.scss";

const style = BemCssModules(AccountStyles);

const AccountPage = () => {
  const { token } = useContext(StoreContext);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const options = {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      };
      return await fetch(URI + "/auth", options);
    })()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.code === 200) {
          setAccount(data.response);
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

  return (
    <section className={style()}>
      <h2>Moje konto</h2>
      {error ? <Error message={message} /> : <Account {...account} />}
    </section>
  );
};
export default AccountPage;
