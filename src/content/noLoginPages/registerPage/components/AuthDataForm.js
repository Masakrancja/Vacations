import React, { useContext } from "react";

import { NoLoginStoreContext } from "../../NoLoginStoreProvider";

const AuthDataForm = () => {
  const { login, setLogin, pass, setPass, pass2, setPass2 } =
    useContext(NoLoginStoreContext);

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const handlePass2Change = (e) => {
    setPass2(e.target.value);
  };

  return (
    <>
      <div className="row mt-4">
        <div className="col-1"></div>
        <div className="col-2">Login</div>
        <div className="col-2">
          <input
            type="text"
            value={login}
            onChange={handleLoginChange}
            placeholder="Podaj login"
          />
        </div>
        <div className="col"></div>
      </div>
      <div className="row mt-1">
        <div className="col-1"></div>
        <div className="col-2">Hasło</div>
        <div className="col-2">
          <input
            type="password"
            value={pass}
            onChange={handlePassChange}
            placeholder="Podaj hasło"
          />
        </div>
        <div className="col"></div>
      </div>
      <div className="row mt-1">
        <div className="col-1"></div>
        <div className="col-2">Hasło ponownie</div>
        <div className="col-2">
          <input
            type="password"
            value={pass2}
            onChange={handlePass2Change}
            placeholder="Powtórz hasło"
          />
        </div>
        <div className="col"></div>
      </div>
    </>
  );
};
export default AuthDataForm;
