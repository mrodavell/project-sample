import Axios from "axios";
import { alerts } from "@utils";

const local = "http://172.20.9.58/api/v1/mobile";
const prod = "https://emonitormo.ustp.edu.ph/api/v1/mobile";

export const axiosApi = ({
  baseUrl = prod,
  token = null,
  multipart = false,
}) => {
  try { 
    return Axios.create({
      baseURL: baseUrl,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-type":
          multipart === true ? "multipart/form-data" : "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (_) { 
    alerts.error({ message: "Network Error" });
  }
};
