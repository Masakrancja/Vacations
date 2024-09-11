import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import Error from "../error/Error";
import Success from "../success/Success";
import UserInfo from "../userInfo/UserInfo";

import BemCssModules from "bem-css-modules";

import { default as LoaderStyles } from "../../../Loader.module.scss";

const styleLoader = BemCssModules(LoaderStyles);

const User = ({ user }) => {
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const { token, setToken, setIsLogged, setIsAdmin, setValidAt } =
    useContext(StoreContext);
  const [userData, setUserData] = useState([]);
  const [show, setShow] = useState(false);
  const [showTitle, setShowTitle] = useState("Pokaż więcej");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [localUser, setLocalUser] = useState(user);

  const { id, createdAt, fullName, login } = user;
  const isActive = Boolean(localUser.isActive);

  const handleOnClick = () => {
    setLoading(true);
    (async () => {
      try {
        const options = {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        };
        const response = await fetch(URI + "/users/" + id, options);
        const data = await response.json();
        if (data.status === "OK") {
          setUserData(data.response.userData);
          setError(false);
          setMessage("");
        } else {
          if (data.code === 401) {
            setIsLogged(false);
            setIsAdmin(false);
            setToken("");
            setValidAt("");
            removeCookie("isLogged", { path: "/" });
            removeCookie("isAdmin", { path: "/" });
            removeCookie("token", { path: "/" });
            removeCookie("validAt", { path: "/" });
            navigate("/");
          } else {
            setError(true);
            setMessage(data.message);
          }
        }
      } catch (error) {
        setError(true);
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    })();
    if (showTitle !== "Pokaż więcej") {
      setShowTitle("Pokaż więcej");
    } else {
      setShowTitle("Pokaż mniej");
    }
    setShow((prev) => !prev);
  };

  const handleOnChange = (e) => {
    setError(false);
    setMessage("");
    setLoading(true);
    (async () => {
      try {
        const options = {
          method: "PATCH",
          headers: { Authorization: "Bearer " + token },
          body: JSON.stringify({
            isActive: e.target.value === "true",
          }),
        };
        const response = await fetch(URI + "/users/" + id, options);
        const data = await response.json();
        if (data.status === "OK") {
          setError(false);
          setMessage(data.message);
          setLocalUser((prevUser) => ({ ...prevUser, isActive: !isActive }));
        } else {
          if (data.code === 401) {
            setIsLogged(false);
            setIsAdmin(false);
            setToken("");
            setValidAt("");
            removeCookie("isLogged", { path: "/" });
            removeCookie("isAdmin", { path: "/" });
            removeCookie("token", { path: "/" });
            removeCookie("validAt", { path: "/" });
            navigate("/");
          } else {
            setError(true);
            setMessage(data.message);
          }
        }
      } catch (error) {
        setError(true);
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <div className="col">
      {loading ? <div className={styleLoader()}></div> : null}
      <div
        className={`card ${
          isActive === true ? "border-success" : "border-danger"
        } mx-auto`}
        style={{ maxWidth: "18rem" }}
      >
        <div className="card-header">
          Imię i nazwisko: <span>{fullName}</span>
        </div>
        <div className="card-body">
          <h5 className="card-title">
            Login: <span>{login}</span>
          </h5>
          <p className="card-text">
            Zarejestrowany: <span>{createdAt.substr(0, 10)}</span>
          </p>
          <p className="card-text">
            Status: {isActive === true ? "Aktywny" : "Nieaktywny"}
          </p>
          <div className="row">
            <div className="col">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value={true}
                  name={`status${id}`}
                  id={`status${id}_active`}
                  defaultChecked={isActive}
                  onChange={handleOnChange}
                />
                <label
                  className="form-check-label"
                  htmlFor={`status${id}_active`}
                >
                  Aktywny
                </label>
              </div>
            </div>
            <div className="col">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value={false}
                  name={`status${id}`}
                  id={`status${id}_inactive`}
                  defaultChecked={!isActive}
                  onChange={handleOnChange}
                />
                <label
                  className="form-check-label"
                  htmlFor={`status${id}_inactive`}
                >
                  Nieaktywny
                </label>
              </div>
            </div>
          </div>
          {show ? <UserInfo {...userData} /> : null}
          <button
            type="button"
            className="btn btn-sm btn-outline-primary text-center"
            onClick={handleOnClick}
          >
            {showTitle}
          </button>

          {error ? <Error message={message} /> : <Success message={message} />}
        </div>
      </div>
    </div>
  );
};
export default User;
