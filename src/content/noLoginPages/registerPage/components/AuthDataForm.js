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
      <div className="row mt-3">
        <div className="col-3">Login</div>
        <div className="col-9">
          <input
            type="text"
            className="form-control"
            value={login}
            onChange={handleLoginChange}
            placeholder="Podaj login"
          />
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-3">Hasło</div>
        <div className="col-9">
          <input
            type="password"
            className="form-control"
            value={pass}
            onChange={handlePassChange}
            placeholder="Podaj hasło"
          />
        </div>
        <div className="col"></div>
      </div>
      <div className="row mt-1">
        <div className="col-3">Hasło ponownie</div>
        <div className="col-9">
          <input
            type="password"
            className="form-control"
            value={pass2}
            onChange={handlePass2Change}
            placeholder="Powtórz hasło"
          />
        </div>
      </div>
    </>
  );
};
export default AuthDataForm;
