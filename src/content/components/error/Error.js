import React from "react";

const Error = ({ message }) => {
  return (
    <div class="alert alert-danger text-center" role="alert">
      {message}
    </div>
  );
};
export default Error;
