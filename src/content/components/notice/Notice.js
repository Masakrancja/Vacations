import React from "react";

const Notice = ({ notice, setNotice }) => {
  const handleNoticeChange = (e) => {
    setNotice(e.target.value);
  };

  return (
    <div className="mt-2">
      <label htmlFor="notice">Notatka</label>
      <textarea
        className="form-control"
        placeholder="Wpisz notatkę"
        id="notice"
        value={notice}
        onChange={handleNoticeChange}
      >
        {notice}
      </textarea>
    </div>
  );
};
export default Notice;
