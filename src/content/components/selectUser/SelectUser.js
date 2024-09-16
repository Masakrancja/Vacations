import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../../StoreProvider";
import { URI } from "../../../config";
import Error from "../error/Error";
import Loader from "../loader/Loader";

const SelectUser = ({ defaultUserId }) => {
  const {
    token,
    setUserId,
    setUserFullName,
    setToken,
    setIsLogged,
    setIsAdmin,
    setValidAt,
  } = useContext(StoreContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const options = {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        };
        const response = await fetch(URI + "/users", options);
        const data = await response.json();
        if (data.status === "OK") {
          setUsers(data.response);
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
  }, []);

  const usersContent = users
    .filter(
      (user) =>
        Boolean(user.isAdmin) === false && Boolean(user.isActive) === true
    )
    .map((user) => (
      <option key={user.id} value={user.id}>
        {`${user.login} - ${user.fullName}`}
      </option>
    ));

  const handleOnChange = (e) => {
    const userId = Number(e.target.value) || null;
    setUserId(userId);
    setUserFullName(users.filter((user) => user.id === userId)[0]?.fullName);
  };

  return (
    <div className="mt-2 w-50">
      <section>
        <h2>Wybierz pracownika z listy</h2>
        <select
          value={defaultUserId}
          className="form-select"
          onChange={handleOnChange}
        >
          <option value="default">Wszyscy pracownicy</option>
          {usersContent}
        </select>
        {error ? <Error message={message} /> : null}
        {loading ? <Loader /> : null}
      </section>
    </div>
  );
};
export default SelectUser;
