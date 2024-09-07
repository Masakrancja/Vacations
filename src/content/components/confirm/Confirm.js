import React from "react";

const Confirm = ({ setShow, setIsConfirmed }) => {
  const handleYes = () => {
    setIsConfirmed(true);
    setShow(false);
  };

  const handleNo = () => {
    setIsConfirmed(false);
    setShow(false);
  };

  return (
    <div>
      <h4>Na pewno?</h4>
      <button className="btn btn-danger" onClick={handleYes}>
        Tak
      </button>
      <button className="btn btn-success" onClick={handleNo}>
        Nie
      </button>
    </div>
  );
};
export default Confirm;
