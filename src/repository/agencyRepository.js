import { response } from '@utils';
import { axiosApi } from '@api';


export const agencyRepository = {
    getAgencies: async (token) => {
        try {
            let result = await axiosApi({ token: token }).get('/masterfiles/agencies');
            return response.handleHTTPResponse(result, false);
        } catch (error) {
            return response.handleHTTPError(error.response, false);
        }
    },
    getMyPrograms: async (token) => {
        try {
            let result = await axiosApi({ token: token }).get('/agency/my-programs');
            return response.handleHTTPResponse(result, false);
        } catch (error) {
            return response.handleHTTPError(error.response, false);
        }
    },
    checkApplyAgency: async (token, params) => {
        try {
            let result = await axiosApi({ token: token }).post('/agency/check-apply', params);
            return response.handleHTTPResponse(result, false);
        } catch (error) {
            return response.handleHTTPError(error.response, false);
        }
    },
    submitALSData: async (token, params) => {
        try {
            let result = await axiosApi({ token: token }).post('/agency/register-als', params);
            return response.handleHTTPResponse(result);
        } catch (error) {
            return response.handleHTTPError(error.response, false);
        }
    },
    submitCSWDData: async (token, params) => {
        try {
            let result = await axiosApi({ token: token }).post('/agency/register-cswd', params);
            return response.handleHTTPResponse(result);
        } catch (error) {
            return response.handleHTTPError(error.response, false);
        }
    },
    submitHEIData: async (token, params) => {
        try {
            let result = await axiosApi({ token: token }).post('/agency/register-hei', params);
            return response.handleHTTPResponse(result);
        } catch (error) {
            return response.handleHTTPError(error.response, false);
        }
    },
    submitPYAPData: async (token, params) => {
        try {
            let result = await axiosApi({ token: token }).post('/agency/register-pyap', params);
            return response.handleHTTPResponse(result);
        } catch (error) {
            return response.handleHTTPError(error.response, false);
        }
    },
    getJobs: async (token) => {
        try {
            let result = await axiosApi({ token: token }).get('/agency/job-posts');
            return response.handleHTTPResponse(result, false);
        } catch (error) {
            return response.handleHTTPError(error.response, false);
        }
    },
    getMyJobs: async (token) => {
        try {
            let result = await axiosApi({ token: token }).get('/agency/my-job');
            return response.handleHTTPResponse(result, false);
        } catch (error) {
            return response.handleHTTPError(error.response, false);
        }
    },
    applyForJob: async (token, params) => {
        try {
            let result = await axiosApi({ token: token }).post('/agency/apply-job', params);
            return response.handleHTTPResponse(result);
        } catch (error) {
            return response.handleHTTPError(error.response, false);
        }
    }
}

