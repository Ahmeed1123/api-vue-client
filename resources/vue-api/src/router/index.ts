// router.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import {useAuthStore} from "@/store/auth.ts";


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import("@/views/Home.vue")
    },
    {
        path: '/404',
        name: '404',
        component: () => import("@/views/errors/404.vue")
    },
    {
        path: '/500',
        name: '500',
        component: () => import("@/views/errors/500.vue")
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/auth/Login.vue"),
        meta: { requiresGuest: true }

    },
    {
        path: '/register',
        name: 'register',
        component: () => import("@/views/auth/Register.vue"),
        meta: { requiresGuest: true }
    },
    {
        path:'/dashboard',
        name:'dashboard',
        component: () => import("@/views/auth/Dashboard.vue"),
        meta: { requiresAuth: true }
    },
    {
        path:'/dashboard/posts',
        name:'PostIndex',
        component: () => import("@/views/posts/PostIndex.vue"),
        meta: { requiresAuth: true }
    },
    {
        path:'/dashboard/posts/:slug',
        name:'PostView',
        component: () => import("@/views/posts/PostView.vue"),
        meta: { requiresAuth: true },
        props:true,
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
router.beforeEach((to, from, next) => {
    const {isLoggedIn} = useAuthStore();
    if(to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) next({name: 'login'})
    else if (to.matched.some(record => record.meta.requiresGuest) && isLoggedIn) next({name: 'dashboard'})
    else next()
})
