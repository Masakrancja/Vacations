import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import Main from "../layouts/Main";

const LogoutPage = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["tokenApi"]);
  const navigate = useNavigate();
  removeCookie("tokenApi", { path: "/" });
  navigate("/login");
  window.location.reload();
};
export default LogoutPage;
