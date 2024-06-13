import React from "react";
import RegisterData from "../../components/RegisterData";
import IsAdmin from "../../components/IsAdmin";
import RegisterGroupData from "../../components/RegisterGroupData";
import SelectGroups from "../../components/SelectGroups";

const RegisterPage = () => {
  return (
    <div>
        <h1>Rejestracja</h1>
        <RegisterData />
        <IsAdmin />
        <RegisterGroupData />
        <SelectGroups />
    </div>
    );
};
export default RegisterPage;
