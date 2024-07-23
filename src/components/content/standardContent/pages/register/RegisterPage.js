import React, { useState } from "react";
import BemCssModules from "bem-css-modules";

import { default as RegisterPageStyles } from "./RegisterPage.module.scss";
import UserOrAdminDataForm from "./components/UserOrAdminDataForm";
import UserDataForm from "./components/UserDataForm";
import AuthDataForm from "./components/AuthDataForm";
import SelectGroupForm from "./components/SelectGroupForm";
import GroupDataForm from "./components/GroupDataForm";

const style = BemCssModules(RegisterPageStyles);

const RegisterPage = () => {
  const [userType, setUserType] = useState(null);

  return (
    <>
      <h2>Rejestracja</h2>
      <AuthDataForm />
      <UserDataForm />
      <UserOrAdminDataForm userType={userType} setUserType={setUserType} />
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
    </>
  );
};
export default RegisterPage;
