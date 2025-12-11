<script setup lang="ts">
import axios from "axios";
import SignupForm from "@/components/new-york-v4/blocks/signup-01/components/SignupForm.vue";
// const SRC = 'api'
// // axios.defaults.baseURL = 'http://api_vue.test';
// // axios.defaults.baseURL = 'http://127.0.0.1:8000';
// axios.defaults.baseURL = 'http://localhost:8000';
// axios.defaults.withCredentials = true;
// axios.defaults.withXSRFToken = true;
// const register = async () => {
//   try {
//     await  axiosInstance.get(`sanctum/csrf-cookie` , {
//         baseURL: BASE_URL,
//     });
//     const response = await  axiosInstance.post(`/register` , {
//       name: 'jhon teset',
//       email: 'teesta@gmaial.com',
//       password: 'password',
//       password_confirmation: 'password',
//     });
//     debugger
//     console.log(response.data)
//   } catch (error) {
//     console.log(error)
//   }
// }
// register()
</script>

<template>
    <SignupForm />
</template>

<style scoped>

</style>
