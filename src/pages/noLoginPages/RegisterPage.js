import React from "react";
import { dataRegisterContext } from "../../context/RegisterContext";
import RegisterData from "../../components/RegisterData";
import IsAdmin from "../../components/IsAdmin";
import RegisterGroupData from "../../components/RegisterGroupData";
import SelectGroups from "../../components/SelectGroups";
import ConfirmRegister from "../../components/ConfirmRegister";

const RegisterPage = () => {
  console.log(dataRegisterContext);
  return (
    <div>
      <h1>Rejestracja</h1>
      <RegisterData />
      <IsAdmin />
      <RegisterGroupData />
      <SelectGroups />
      <ConfirmRegister />
    </div>
  );
};
export default RegisterPage;
