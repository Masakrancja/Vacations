import React from "react";

const EventWaiting = ({ message }) => {
  return (
    <div className="d-flex justify-content-evenly align-items-center p-1">
      <div>{message}</div>
      <div className="spinner-border spinner-border-sm" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
export default EventWaiting;
