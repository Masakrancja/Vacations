import React from "react";
import BemCssModules from "bem-css-modules";

import { default as NoticeStyle } from "./Notice.module.scss";

const style = BemCssModules(NoticeStyle);

const Notice = ({ notice, setNotice }) => {
  const handleNoticeChange = (e) => {
    setNotice(e.target.value);
  };

  return (
    <div className={style()}>
      <textarea value={notice} onChange={handleNoticeChange}>
        {notice}
      </textarea>
    </div>
  );
};
export default Notice;
