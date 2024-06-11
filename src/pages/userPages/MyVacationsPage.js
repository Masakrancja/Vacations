import React from "react";
import { useLocation } from "react-router-dom";

const MyVacationPage = () => {
  const { search } = useLocation();

  console.log(search);

  return <>Moje urlopy</>;
};
export default MyVacationPage;
