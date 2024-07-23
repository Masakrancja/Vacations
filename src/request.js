import axios from "axios";
import { URI } from "./config";

const request = axios.create({
  baseURL: URI,
  validateStatus: false,
});
export default request;
