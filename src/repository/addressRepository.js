import { response } from '@utils';
import { axiosApi } from '@api';

export const addressRepository = {
    getProvinces: async () => {
        try {
            let result = await axiosApi({}).get('/zipcode/provinces');
            return response.handleHTTPResponse(result, false);
        } catch (error) {
            return response.handleHTTPError(error.response, false);
        }
    },
    getCities: async (province) => {
        try {
            let result = await axiosApi({}).post('/zipcode/cities', province);
            return response.handleHTTPResponse(result, false);
        } catch (error) {
            return response.handleHTTPError(error.response, false);
        }
    },
    getBrgys: async (zipcode) => {
        try {
            let result = await axiosApi({}).post('/zipcode/barangay', zipcode);
            return response.handleHTTPResponse(result, false);
        } catch (error) {
            return response.handleHTTPError(error.response, false);
        }
    },
}

