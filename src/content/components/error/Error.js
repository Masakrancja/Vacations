import React, { useState } from "react";

const Error = ({ message }) => {
  const [show, setShow] = useState(true);

  const handleClick = () => {
    setShow(false);
  };

  return (
    <>
      {show ? (
        <div className="position-absolute top-50 start-50 translate-middle">
          <div
            className="alert alert-danger alert-dismissible fade show fw-bold"
            role="alert"
          >
            {message}
            <button
              type="button"
              onClick={handleClick}
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Error;
