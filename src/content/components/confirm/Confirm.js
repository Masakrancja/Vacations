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
    <>
      <div className="row mt-1">
        <div className="col text-center">
          <h4>Na pewno?</h4>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col p-2 text-center">
          <button className="btn btn-sm btn-outline-danger" onClick={handleYes}>
            Tak
          </button>
        </div>
        <div className="col p-2 text-center">
          <button className="btn btn-sm btn-outline-success" onClick={handleNo}>
            Nie
          </button>
        </div>
      </div>
    </>
  );
};
export default Confirm;
