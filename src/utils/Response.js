import { alerts } from "./Alerts";

/**
 * This service is use for handling HTTP responseData 
 * 
 */
export const response = {
    handleHTTPResponse: (responseData, notifySuccess = true, notifyError = true) => {
        if (responseData && responseData !== undefined) {
            if (responseData?.status >= 200 && responseData?.status <= 300) {
                return response?.handleHTTPSuccess(responseData, notifySuccess);
            }
        }
        return response?.handleHTTPError(responseData, notifyError);
    },
    handleHTTPSuccess: (responseData, notification = true) => {
        try {

            let message = "Request Successful";

            let data = responseData?.data ?? null;
            let params = responseData?.params ?? null;

            if (data?.message !== undefined) {
                message = data?.message.toString();
            }

            if (notification) {
                alerts.success({ message: message });
            }

            return { message: message, data: data, params: params, error: false };

        } catch (e) {
            alerts.error({ message: e.toString() });
        }
    },
    handleHTTPError: (responseData, notification = true) => {
        try {

            let message = "Request Failed";

            let data = responseData.data ?? null;
            let params = responseData.params ?? null;

            if (data?.message !== undefined) {
                message = data.message.toString();
            }
            // Handle request validation from laravel back-end
            if (data?.errors !== undefined) {
                if (Object.keys(data?.errors).length > 0) {
                    let err = data?.errors;
                    Object.keys(err).forEach(key => {
                        message = err[key][0];
                    });
                }
            }

            if (notification) {
                alerts.error({ message: message });
            }

            return { message: message, data: data, error: true, params: params };

        } catch (e) {
            alerts.error({ message: e.toString() });
        }
    }
} 