import React, { useContext, useState } from "react";
import BemCssModules from "bem-css-modules";

import { default as RegisterPageStyles } from "./RegisterPage.module.scss";
import { StandardStoreContext } from "../../StandardStoreProvider";
import { URI } from "../../../../../config";
import UserOrAdminDataForm from "./components/UserOrAdminDataForm";
import UserDataForm from "./components/UserDataForm";
import AuthDataForm from "./components/AuthDataForm";
import SelectGroupForm from "./components/SelectGroupForm";
import GroupDataForm from "./components/GroupDataForm";
import Error from "../../../components/error/Error";
import Success from "../../../components/success/Success";

const style = BemCssModules(RegisterPageStyles);

const RegisterPage = () => {
  const {
    login,
    pass,
    pass2,
    groupId,
    firstName,
    lastName,
    address,
    postalCode,
    city,
    phone,
    email,
    groupName,
    groupAddress,
    groupPostalCode,
    groupCity,
    groupNip,
    userType,
  } = useContext(StandardStoreContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleOnSubmit = (e) => {
    setMessage("");
    setError(false);
    e.preventDefault();
    if (!equalPasswords()) {
      setError(true);
      setMessage("Wprowadzone hasła różnią się. Wprowadź ponownie hasło");
      return;
    }

    const body = {
      login,
      pass,
      pass2,
      isAdmin: userType === "admin" ? true : false,
      groupId,
      userData: {
        firstName,
        lastName,
        address,
        postalCode,
        city,
        phone,
        email,
      },
      group: {
        name: groupName,
        address: groupAddress,
        postalCode: groupPostalCode,
        city: groupCity,
        nip: groupNip,
      },
    };

    (async () => {
      const options = {
        method: "POST",
        body: JSON.stringify(body),
      };
      return await fetch(URI + "/users", options);
    })()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code === 201) {
          setError(false);
          setMessage(`Poprawnie dodano użytkownika: ${login}`);
        } else {
          setError(true);
          setMessage(data.message);
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(`Błąd: ${err.message}`);
      });
  };

  const equalPasswords = () => {
    return pass === pass2;
  };

  return (
    <div className={style()}>
      <h2>Rejestracja</h2>
      <form method="POST" onSubmit={handleOnSubmit}>
        <AuthDataForm />
        <UserDataForm />
        <UserOrAdminDataForm />
        {userType === "user" ? (
          <>
            <SelectGroupForm />
          </>
        ) : null}
        {userType === "admin" ? (
          <>
            <GroupDataForm />
          </>
        ) : null}
        <button type="submit">Zarejestruj</button>
      </form>
      {error ? <Error message={message} /> : <Success message={message} />}
    </div>
  );
};
export default RegisterPage;
