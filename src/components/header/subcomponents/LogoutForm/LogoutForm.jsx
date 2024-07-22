import React, { useContext } from "react";
import BemCssModules from 'bem-css-modules';

import { StoreContext } from "../../../../StoreProvider";

import {default as LogoutStyles} from './LogoutForm.module.scss';

const style = BemCssModules(LogoutStyles);

const LogoutForm = () => {
  const {setIsLogged, setToken } = useContext(StoreContext);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log('Wylogowywanie...');
    setIsLogged(false);
    setToken('');
  }

  return (
    <div className={style()}>
      <form method="POST" onSubmit={handleOnSubmit}>
        <button type="submit">Wyloguj</button>
      </form>
    </div>
  );
}
export default LogoutForm;
