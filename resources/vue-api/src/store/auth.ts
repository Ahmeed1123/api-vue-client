import { defineStore } from 'pinia';
import { ref } from "vue";
import type {CreatePostForm, LoginForm, RegisterForm, User} from "@/types";
import axiosInstance, { BASE_URL } from "@/lib/axios.ts";
import toastAlert from "@/composables/useAlert.ts";
import { router } from "@/router";
import { AxiosError } from "axios";
import { handleValidationErrors, loginSchema, registerSchema } from "@/validation";

export const useAuthStore = defineStore('auth', () => {
    // User state
    const user = ref<User | null>(null);
    const isLoggedIn = ref<boolean>(false);

    // Loading state
    const loading = ref<boolean>(false);

    // Register function
    const register = async (payload: RegisterForm, setFieldError?: (field: string, msg?: string) => void) => {
        loading.value = true;
        try {
            await axiosInstance.get(`sanctum/csrf-cookie`, { baseURL: BASE_URL });
            const response = await axiosInstance.post('register', payload);

            if (response.status === 201) {
                isLoggedIn.value = true;
                toastAlert(response.data.status, response.data.message);
            } else {
                toastAlert(response.data.status, response.data.message);
            }

            await router.push('/dashboard');
        } catch (e: unknown) {
            console.log(e);
            if (e instanceof AxiosError && e.response?.status === 422) {
                const errors = e.response?.data.errors;
                if (setFieldError) {
                    handleValidationErrors(errors, setFieldError as unknown as (field: string, msg?: string) => void);
                }
            } else if (e instanceof Error) {
                toastAlert('Error', e.response.data.message , 'error');
            } else {
                toastAlert('Error', String(e) , 'error');
            }
        } finally {
            loading.value = false;
        }
    };

    // Login function
    const login = async (payload: LoginForm, setFieldError?: (field: string, msg?: string) => void) => {
        loading.value = true;
        console.log(loading.value);
        try {
            await axiosInstance.get(`sanctum/csrf-cookie`, { baseURL: BASE_URL });
            const response = await axiosInstance.post('login', payload);

            if (response.status === 200) {
                isLoggedIn.value = true;
                toastAlert(response.data.status, response.data.message);
            } else {
                toastAlert(response.data.status, response.data.message, 'error');
            }

            await router.push('/dashboard');
        } catch (e: unknown) {
            console.log(e);
            if (e instanceof AxiosError && e.response?.status === 422) {
                const errors = e.response?.data.errors;
                if (setFieldError) {
                    handleValidationErrors(errors, setFieldError as unknown as (field: string, msg?: string) => void);
                } else {
                    console.warn('Validation errors received but no setFieldError callback provided', errors);
                }
            }
            if (e instanceof AxiosError) {
                toastAlert('', e.response?.data.message ?? 'An error occurred', 'error');
            } else if (e instanceof Error) {
                toastAlert('', e.message, 'error');
            } else {
                toastAlert('', String(e), 'error');
            }
        } finally {
            loading.value = false;
        }
    };

    const getUser = async () => {
        if(!isLoggedIn.value) return;
        try {
            const response = await axiosInstance.get('user');
            user.value = response.data;
            if(response.status === 200) {
                toastAlert(response.data.status, 'تم جلب بيانتك بنجاح')
                console.log(response.data)
            } else {
                console.log(response.data)
            }
        } catch (e) {
            console.log(e)
            toastAlert(e.status,e.response.data.message, 'error')
        }
    }

    const cleanState = () => {
        user.value = null;
        isLoggedIn.value = false;
    };
    const logout = async () => {
        try {
            const response = await axiosInstance.post('logout');
            console.log(response.data)
            user.value = null;
            isLoggedIn.value = false;
            await router.push('/login');
        } catch (error) {
            console.log(error)
        }
    }

    return {
        user,
        isLoggedIn,
        loading,
        getUser,
        logout,
        register,
        login,
        cleanState,
    };
}, {
    persist: {
        storage:sessionStorage,
        pick: ['user', 'isLoggedIn']
    }
});
