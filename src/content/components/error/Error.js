import React, { useState } from "react";

const Error = ({ message }) => {
  const [show, setShow] = useState(true);

  const handleClick = () => {
    setShow(false);
  };

  return (
    <>
      {show ? (
        <div>
          <div className="text-center text-danger fw-bold">{message}</div>
          <button onClick={handleClick}>OK</button>
        </div>
      ) : null}
    </>
  );
};
export default Error;
