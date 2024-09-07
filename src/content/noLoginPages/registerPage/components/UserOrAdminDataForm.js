import React, { useContext } from "react";

import { NoLoginStoreContext } from "../../NoLoginStoreProvider";

const UserOrAdminDataForm = () => {
  const { userType, setUserType } = useContext(NoLoginStoreContext);
  const handleChange = (e) => setUserType(e.target.id);
  const checkedUser = userType === "user" ? "checked" : null;
  const checkedAdmin = userType === "admin" ? "checked" : null;

  return (
    <div className="row mt-4">
      <div className="col-6">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="client"
            id="user"
            onChange={handleChange}
            defaultChecked={checkedUser}
          />
          <label className="form-check-label" htmlFor="user">
            Jestem pracownikiem
          </label>
        </div>
      </div>
      <div className="col-6">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="client"
            id="admin"
            onChange={handleChange}
            defaultChecked={checkedAdmin}
          />
          <label className="form-check-label" htmlFor="admin">
            Jestem pracodawcą
          </label>
        </div>
      </div>
    </div>
  );
};
export default UserOrAdminDataForm;
