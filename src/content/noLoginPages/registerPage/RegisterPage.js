import React, { useContext, useState } from "react";
import BemCssModules from "bem-css-modules";

import { NoLoginStoreContext } from "../NoLoginStoreProvider";
import { URI } from "../../../config";
import UserOrAdminDataForm from "./components/UserOrAdminDataForm";
import UserDataForm from "./components/UserDataForm";
import AuthDataForm from "./components/AuthDataForm";
import SelectGroupForm from "./components/SelectGroupForm";
import GroupDataForm from "./components/GroupDataForm";
import Error from "../../components/error/Error";
import Success from "../../components/success/Success";

import { default as RegisterPageStyles } from "./RegisterPage.module.scss";
import { default as LoaderStyle } from "../../../Loader.module.scss";

const style = BemCssModules(RegisterPageStyles);
const styleLoader = BemCssModules(LoaderStyle);

const RegisterPage = () => {
  const {
    login,
    setLogin,
    pass,
    setPass,
    pass2,
    setPass2,
    groupId,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    address,
    setAddress,
    postalCode,
    setPostalCode,
    city,
    setCity,
    phone,
    setPhone,
    email,
    setEmail,
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
    userType,
    setUserType,
  } = useContext(NoLoginStoreContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleOnSubmit = (e) => {
    setMessage("");
    setError(false);
    e.preventDefault();
    if (!equalPasswords()) {
      setError(true);
      setMessage("Wprowadzone hasła różnią się. Wprowadź ponownie hasło");
    } else {
      setLoading(true);
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
        try {
          const options = {
            method: "POST",
            body: JSON.stringify(body),
          };
          const response = await fetch(URI + "/users", options);
          const data = await response.json();
          if (data.status === "OK") {
            setError(false);
            setLogin("");
            setPass("");
            setPass2("");
            setFirstName("");
            setLastName("");
            setAddress("");
            setPostalCode("");
            setCity("");
            setPhone("");
            setEmail("");
            setGroupName("");
            setGroupAddress("");
            setGroupPostalCode("");
            setGroupCity("");
            setGroupNip("");
            setUserType("user");
            const msg =
              userType === "user"
                ? `Poprawnie dodano konto pracownicze dla użytkownika: ${login}. Konto jest jeszcze nie aktywne. Poczekaj na akceptacje przez właściciela`
                : `Poprawnie dodano konto właściciela dla użytkownika: ${login}`;
            setMessage(msg);
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
    }
  };

  const equalPasswords = () => {
    return pass === pass2;
  };

  return (
    <div className={style()}>
      {loading ? <div className={styleLoader()}></div> : null}
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
