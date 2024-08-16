import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../../../StoreProvider";
import { URI } from "../../../../config";
import Error from "../error/Error";
import Success from "../success/Success";
import UserInfo from "../userInfo/UserInfo";

import BemCssModules from "bem-css-modules";

import { default as UserStyle } from "./User.module.scss";

const style = BemCssModules(UserStyle);

const User = ({ user }) => {
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const { token, setToken, setIsLogged, setIsAdmin, setIsValid } =
    useContext(StoreContext);
  const [userData, setUserData] = useState([]);
  const [show, setShow] = useState(false);
  const [showTitle, setShowTitle] = useState("Szczegóły");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [localUser, setLocalUser] = useState(user);

  const { id, createdAt, fullName, login } = user;
  const isActive = Boolean(localUser.isActive);

  const handleOnClick = () => {
    (async () => {
      const options = {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      };
      return await fetch(URI + "/users/" + id, options);
    })()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code === 401) {
          setIsLogged(false);
          setIsAdmin(false);
          setToken("");
          setIsValid("");
          removeCookie("isLogged", { path: "/" });
          removeCookie("isAdmin", { path: "/" });
          removeCookie("token", { path: "/" });
          removeCookie("isValid", { path: "/" });
          navigate("/");
        }
        if (data.code === 200) {
          setUserData(data.response.userData);
          setError(false);
          setMessage("");
        } else {
          setError(true);
          setMessage(data.message);
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(err.message);
      });

    if (showTitle !== "Szczegóły") {
      setShowTitle("Szczegóły");
    } else {
      setShowTitle("Pokaż mniej");
    }
    setShow((prev) => !prev);
  };

  const handleOnChange = (e) => {
    setError(false);
    setMessage("");
    (async () => {
      const options = {
        method: "PATCH",
        headers: { Authorization: "Bearer " + token },
        body: JSON.stringify({
          isActive: e.target.value === "true",
        }),
      };
      return await fetch(URI + "/users/" + id, options);
    })()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.code === 401) {
          setIsLogged(false);
          setIsAdmin(false);
          setToken("");
          setIsValid("");
          removeCookie("isLogged", { path: "/" });
          removeCookie("isAdmin", { path: "/" });
          removeCookie("token", { path: "/" });
          removeCookie("isValid", { path: "/" });
          navigate("/");
        }
        if (data.code === 200) {
          setError(false);
          setMessage(data.message);
          setLocalUser((prevUser) => ({ ...prevUser, isActive: !isActive }));
        } else {
          setError(true);
          setMessage(data.message);
        }
      })
      .catch((err) => {
        setError(true);
        setMessage(err.message);
      });
  };

  return (
    <div className={style(isActive === true ? "active" : "inactive")}>
      <div>
        <p>
          Imię i nazwisko: <span>{fullName}</span>
        </p>
        <p>
          Login: <span>{login}</span>
        </p>
        <p>
          Zarejestrowany: <span>{createdAt.substr(0, 10)}</span>
        </p>
        <p>Status: {isActive === true ? "Aktywny" : "Nieaktywny"}</p>
        <label>
          <input
            type="radio"
            value={true}
            name={`status${id}`}
            defaultChecked={isActive}
            onChange={handleOnChange}
          />
          Aktywny
        </label>
        <label>
          <input
            type="radio"
            value={false}
            name={`status${id}`}
            defaultChecked={!isActive}
            onChange={handleOnChange}
          />
          Nieaktywny
        </label>
        {show ? <UserInfo {...userData} /> : null}
        <button onClick={handleOnClick}>{showTitle}</button>
        {error ? <Error message={message} /> : <Success message={message} />}
      </div>
    </div>
  );
};
export default User;
