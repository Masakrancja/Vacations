import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import Error from "../error/Error";
import Success from "../success/Success";
import UserInfo from "../userInfo/UserInfo";
import Loader from "../loader/Loader";

import BemCssModules from "bem-css-modules";

import { default as UserStyle } from "./User.module.scss";

const style = BemCssModules(UserStyle);

const User = ({ user }) => {
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const { token, setToken, setIsLogged, setIsAdmin, setValidAt } =
    useContext(StoreContext);
  const [userData, setUserData] = useState([]);
  const [show, setShow] = useState(false);
  const [showTitle, setShowTitle] = useState("Szczegóły");
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

  if (loading) {
    return <Loader />;
  }

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
