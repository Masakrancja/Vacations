import React, { useContext, useState } from "react";
import BemCssModules from 'bem-css-modules';

import { StoreContext } from "../../../../StoreProvider";

import {default as LoginStyles} from './LoginForm.module.scss';

const style = BemCssModules(LoginStyles);

const LoginForm = () => {
  const {setIsLogged, setToken } = useContext(StoreContext);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = (e) => setLogin(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log('Logowanie...');
    setIsLogged(true);
    setToken('dfdsfSDdcZxcZcZDvS');
  }
  return (
    <div className={style()}>
      <form method="POST" onSubmit={handleOnSubmit}>
        <input type="text" value={login} onChange={handleLoginChange} placeholder="Podaj login"/>
        <input type="password" value={password} onChange={handlePasswordChange} placeholder="Podaj hasło"/>
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );

}
export default LoginForm;