import { response, storage } from "@utils";
import { axiosApi, csrf } from "@api";

export const authRepository = {
  me: async (token) => {
    try {
      let result = await axiosApi({ token: token }).get("/me");
      let data = response.handleHTTPResponse(result, false);
      return data.data;
    } catch (error) {
      return response.handleHTTPError(error.response, false);
    }
  },
  sendCode: async (params) => {
    try {
      await csrf.getToken();
      let result = await axiosApi({}).post("/send-code", params);
      return response.handleHTTPResponse(result, false);
    } catch (error) {
      return response.handleHTTPError(error.response, false);
    }
  },
  sendCodeForgot: async (params) => {
    try {
      await csrf.getToken();
      let result = await axiosApi({}).post("/forgot/send-code", params);
      return response.handleHTTPResponse(result, false);
    } catch (error) {
      return response.handleHTTPError(error.response, false);
    }
  },
  verify: async (params) => {
    try {
      let result = await axiosApi({}).post("/verify", params);
      return response.handleHTTPResponse(result, false);
    } catch (error) {
      return response.handleHTTPError(error.response, false);
    }
  },
  register: async (params) => {
    try {
      let result = await axiosApi({}).post("/register", params);
      return response.handleHTTPResponse(result, false);
    } catch (error) {
      return response.handleHTTPError(error.response, false);
    }
  },
  login: async (params) => {
    try {
      await csrf.getToken();
      let result = await axiosApi({}).post("/login", params);
      return response.handleHTTPResponse(result, false, false);
    } catch (error) {
      return response.handleHTTPError(error.response, false, false);
    }
  },
  logout: async (token) => {
    try {
      let result = await axiosApi({ token: token }).post("/logout");
      return response.handleHTTPResponse(result, false);
    } catch (error) {
      return response.handleHTTPError(error.response, false);
    }
  },
  changePassword: async (token, params) => {
    try {
      let result = await axiosApi({ token: token }).post(
        "/change-password",
        params
      );
      return response.handleHTTPResponse(result);
    } catch (error) {
      return response.handleHTTPError(error.response, false);
    }
  },
  resetPassword: async (params) => {
    try {
      let result = await axiosApi({}).post("/change-password", params);
      return response.handleHTTPResponse(result, false);
    } catch (error) {
      return response.handleHTTPError(error.response, false);
    }
  },
  setNotFirstLogin: async (token) => {
    try {
      let result = await axiosApi({ token }).post("/update-first-login", {
        is_first_login: "0",
      });
      return response.handleHTTPResponse(result, false);
    } catch (error) {
      return response.handleHTTPError(error.response, false);
    }
  },
  updateProfile: async (token, params) => {
    try {
      let result = await axiosApi({ token: token }).post(
        "/update-profile",
        params
      );
      return response.handleHTTPResponse(result);
    } catch (error) {
      return response.handleHTTPError(error.response, false);
    }
  },
  updateAddress: async (token, params) => {
    try {
      let result = await axiosApi({ token: token }).post(
        "/update-address",
        params
      );
      return response.handleHTTPResponse(result);
    } catch (error) {
      return response.handleHTTPError(error.response, false);
    }
  },
  updateEducation: async (token, params) => {
    try {
      let result = await axiosApi({ token: token }).post(
        "/update-education",
        params
      );
      return response.handleHTTPResponse(result);
    } catch (error) {
      return response.handleHTTPError(error.response, false);
    }
  },
  updateEmail: async (token, params) => {
    try {
      let result = await axiosApi({ token: token }).post(
        "/update-email",
        params
      );
      return response.handleHTTPResponse(result, false);
    } catch (error) {
      return response.handleHTTPError(error.response, false);
    }
  },
};
