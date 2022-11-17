import * as axios from "axios";
import { apiDomain } from "./../store/constants";
const apiServices = axios.create({
  baseURL: apiDomain
});

export default apiServices;
