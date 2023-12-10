import { response } from "@utils";
import { axiosApi } from "@api";

export const youthRepository = {
  upload: async (token, params) => {
    try {
      let result = await axiosApi({ token: token }).post(
        "/upload-als-youth",
        params
      );
      return response.handleHTTPResponse(result, false);
    } catch (error) {
      return response.handleHTTPError(error.response, false);
    }
  },
};
