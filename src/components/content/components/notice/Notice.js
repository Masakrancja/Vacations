import React, { useContext } from "react";
import BemCssModules from "bem-css-modules";
import { UserStoreContext } from "../../userContent/UserStoreProvider";

import { default as NoticeStyle } from "./Notice.module.scss";

const style = BemCssModules(NoticeStyle);

const Notice = () => {
  const { notice, setNotice } = useContext(UserStoreContext);

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
