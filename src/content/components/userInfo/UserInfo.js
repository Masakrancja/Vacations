import React, { useContext, useEffect, useState } from "react";

import BemCssModules from "bem-css-modules";

import { default as UserInfoStyle } from "./UserInfo.module.scss";

const style = BemCssModules(UserInfoStyle);

const UserInfo = ({
  address,
  city,
  email,
  firstName,
  lastName,
  phone,
  postalCode,
}) => {
  return (
    <div className={style()}>
      <p>User Info</p>
      <p>
        {firstName} {lastName}
      </p>

      <p>{address}</p>
      <p>
        {postalCode} {city}
      </p>
      <p>{phone}</p>
      <p>{email}</p>
    </div>
  );
};
export default UserInfo;
