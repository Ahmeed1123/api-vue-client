<script setup lang="ts">
import { Toaster } from "vue-sonner";
import 'vue-sonner/style.css'
import AppearanceTabs from "@/components/site/ui/AppearanceTabs.vue";
import Register from "@/views/auth/Register.vue";
import {ref} from "vue";
import {Button} from "@/components/ui/button";

const menuToggle = ref(false);

// menuToggle.addEventListener('click', () => {
//     if (mobileMenu.classList.contains('hidden')) {
//         mobileMenu.classList.remove('hidden');
//         mobileMenu.classList.add('flex');
//     } else {
//         mobileMenu.classList.add('hidden');
//         mobileMenu.classList.remove('flex');
//     }
// });

</script>

<template>
    <div class=" relative max-w-420 px-3 mx-auto flex flex-col gap-3 min-h-screen">
        <nav class="flex my-5 items-center border  md:w-full md:justify-between border-slate-700 px-6 py-4 rounded-full text-white text-sm">
            <a href="https://prebuiltui.com">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="4.706" cy="16" r="4.706" fill="#D9D9D9" />
                    <circle cx="16.001" cy="4.706" r="4.706" fill="#D9D9D9" />
                    <circle cx="16.001" cy="27.294" r="4.706" fill="#D9D9D9" />
                    <circle cx="27.294" cy="16" r="4.706" fill="#D9D9D9" />
                </svg>
            </a>
            <div class="hidden md:flex items-center gap-6 ms-7 flex-1">
                <Button @click="menuToggle = !menuToggle" variant="ghost" class="text-black dark:text-white cursor-pointer md:hidden">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                         stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </Button>
                <div v-show="menuToggle" class="absolute md:hidden z-100 flex top-[70px]  text-base left-0 bg-white w-full flex-col items-center gap-4">
                </div>


                <router-link class="relative overflow-hidden h-6 group text-black dark:text-white" to="/">
                <span class="block group-hover:-translate-y-full transition-transform duration-300">
                    Home
                </span>
                    <span
                        class="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
                    Home
                </span>
                </router-link>
                <router-link class="relative overflow-hidden h-6 group text-black dark:text-white" to="/dashboard">
                <span class="block group-hover:-translate-y-full transition-transform duration-300">
                    Dashboard
                </span>
                    <span
                        class="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
                    Dashboard
                </span>
                </router-link>
                <router-link class="relative overflow-hidden h-6 group text-black dark:text-white" to="/dashboard/posts">
                <span class="block group-hover:-translate-y-full transition-transform duration-300">
                    Posts
                </span>
                    <span
                        class="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
                    Posts
                </span>
                </router-link>
                <div class="ms-auto flex items-center gap-3">
                    <router-link class="relative overflow-clip h-6 group text-black dark:text-white" to="login">
                 <span class="block group-hover:-translate-y-full transition-transform duration-300">
                    login
                </span>
                        <span
                            class="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
                    login
                </span>
                    </router-link>
                    <router-link class="relative overflow-hidden h-6 group text-black dark:text-white" to="register">
                 <span class="block group-hover:-translate-y-full transition-transform duration-300">
                    register
                </span>
                        <span
                            class="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
                    register
                </span>
                    </router-link>
                </div>
            </div>
        </nav>
        <div>
            <router-view />
        </div>
        <Toaster position="top-center" richColors />
        <div class="mt-auto ">
            <AppearanceTabs />
        </div>
    </div>
</template>
