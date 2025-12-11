import { defineStore } from 'pinia';
import { ref } from "vue";
import type {PostForm, LaravelResponseCollection, LoginForm, Post, RegisterForm, User, CreatePostForm} from "@/types";
import axiosInstance, { BASE_URL } from "@/lib/axios.ts";
import toastAlert from "@/composables/useAlert.ts";
import { router } from "@/router";
import { AxiosError } from "axios";
import { handleValidationErrors, loginSchema, registerSchema } from "@/validation";

export const usePostStore = defineStore('post', () => {
    const postsCollection = ref<LaravelResponseCollection<Post | null>>(null);
    const post = ref<Post | null>(null);
    const loading = ref<boolean>(false);
    const loadingPosts = ref<boolean>(false);
    const open = ref<boolean>(false);
    const getPosts = async (page: number ) => {
        loadingPosts.value = true;
        try {
            const { data } = await axiosInstance.get(`dashboard/posts?page=${page}`);
            postsCollection.value = data;
            console.log(postsCollection.value.data);
        } catch (e: unknown) {
            console.log(e);
        } finally {
            loading.value = false;
        }
        loadingPosts.value = false;
    };

    const getPost = async (slug?: string | string[]) => {
        loading.value = true;
        console.log('1')
        try {
            const {data} = await axiosInstance.get(`dashboard/posts/${slug}`)
            console.log(data);
            console.log('2')
            post.value = data.data;
            console.log('3')
        } catch (e: unknown) {
            toastAlert( e.status ,e.message,'error')
            console.error("Error fetching post:", e);
        } finally {
            loading.value = false;
        }
        console.log('4')
    }
    const updatePost = async (slug?: string, payload?:PostForm, setFieldError?: (field: string, msg?: string) => void) => {
        loading.value = true;
        try {
            const response = await axiosInstance.put(`dashboard/posts/${slug}`, payload);
            toastAlert(response.data.status, response.data.message);
            // emit("update", response.data.data);
            open.value = false;
            await router.push('/dashboard/posts');
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
    const createPost = async (payload: PostForm, setFieldError?: (field: string, msg?: string) => void) => {
        loading.value = true;
        const response = ref(null);
        try {
            const {data} = await axiosInstance.post('dashboard/posts/creates', payload);
            response.value = data;
            toastAlert(data.status, data.message);
            await router.push('/dashboard/posts');
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
        return response;
    };

    const deletePost = async (page: number,slug: string) => {
        loading.value = true;
        const response = ref(null);
        try {
          const data = await axiosInstance.delete(`dashboard/posts/${slug}`)
            console.log(data);
            await getPosts(page);
            toastAlert('تم الحذف بنجاح');
        } catch (e: unknown) {

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
        return response;
    };

    return {
        loading,
        open,
        loadingPosts,
        post,
        postsCollection,
        getPosts,
        deletePost,
        getPost,
        updatePost,
        createPost,

    };
})
