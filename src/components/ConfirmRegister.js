import React from "react";
import Error from "./Error";
import Success from "./Success";

const ConfirmRegister = ({ click, message, registered }) => {
  return (
    <div>
      <button onClick={click}>Rejestruj</button>
      {registered ? <Success message={message} /> : <Error message={message} />}
    </div>
  );
};
export default ConfirmRegister;
