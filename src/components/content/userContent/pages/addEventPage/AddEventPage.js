import React, { useContext } from "react";
import BemCssModules from "bem-css-modules";
import SelectReason from "../../../components/selectReason/SelectReason";
import SelectData from "../../../components/selectData/SelectData";

import { default as AddEventStyles } from "./AddEventPage.module.scss";

const style = BemCssModules(AddEventStyles);

const AddEventPage = () => {
  return (
    <section>
      <h2>Dodaj urlop</h2>
      <form method="POST">
        <SelectReason />
        <SelectData />
        <button type="submit">Dodaj</button>
      </form>
    </section>
  );
};
export default AddEventPage;
