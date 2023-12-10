import { axiosApi } from "./api";

const local = "http://172.20.9.58/api/v1";
const prod = "https://emonitormo.ustp.edu.ph/api/v1";

export const csrf = {
    getToken: async () => {
        await axiosApi({ baseUrl: prod }).get('/csrf-cookie');
    }
} 