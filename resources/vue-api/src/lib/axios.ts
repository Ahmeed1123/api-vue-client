import axios from "axios";
import {router} from "@/router";
import {useAuthStore} from "@/store/auth.ts";
import toastAlert from "@/composables/useAlert.ts";
export const BASE_URL = 'http://localhost:8000'
const axiosInstance = axios.create({
    // axios.defaults.baseURL = 'http://api_vue.test';
// axios.defaults.baseURL = 'http://127.0.0.1:8000';
    baseURL:`${BASE_URL}/api`,
    withCredentials:true,
    withXSRFToken:true
})
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
                const { cleanState } = useAuthStore();
                switch (error.response.status) {
                    case 401:
                        cleanState()
                        router.push('/login');
                        break;
                    case 404:
                        toastAlert('', 'page not found', 'error');
                        router.push('/404');
                        break;
                    case 419:
                        cleanState()
                        router.push('/login');
                        toastAlert('', 'Unauthorized! login to continue.', 'error');
                        break;
                    case 500:
                        toastAlert('', 'Internal server Error', 'error');

                        router.push('/500');
                        break;

                    default:
                        return Promise.reject(error);
                }
                return Promise.reject(error);
        }
    )
export default axiosInstance;

