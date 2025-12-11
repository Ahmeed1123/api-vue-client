import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PiniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createPinia } from 'pinia'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
const pinia = createPinia()
pinia.use(PiniaPluginPersistedstate);
import {router} from "@/router/index.ts";
createApp(App)
    .use(router)
    .use(pinia)
    .use(autoAnimatePlugin)
    .mount('#app')
