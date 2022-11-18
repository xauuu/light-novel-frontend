import * as axios from "axios";
import { apiDomain } from "./../store/constants";
const apiServices = axios.create({
  baseURL: apiDomain,
  withCredentials: true
});

export default apiServices;
