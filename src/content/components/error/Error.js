import React, { useEffect, useState } from "react";

import "./style.css";

const Error = ({ message }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [show]);

  return (
    <>
      {message && show ? (
        <div className="position-absolute top-50 start-50 translate-middle">
          <div
            className="alert alert-danger text-center error-show"
            role="alert"
          >
            {message}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Error;
