import React from "react";

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
    <>
      <address>
        <strong>
          {firstName} {lastName}
        </strong>
        <br />
        {address}
        <br />
        {postalCode} {city}
        <br />
      </address>
      <address>
        <abbr title="Phone">Tel: </abbr>
        {phone}
        <br />
        <abbr title="Email">Email: </abbr>
        {email}
      </address>
    </>
  );
};
export default UserInfo;
