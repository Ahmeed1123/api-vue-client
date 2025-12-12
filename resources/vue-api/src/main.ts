import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PiniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createPinia } from 'pinia'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
const pinia = createPinia()
pinia.use(PiniaPluginPersistedstate);
import {router} from "@/router/index.ts";
import { initializeThemeSetup } from "@/composables/useAppearance.ts";
const app = createApp(App);


app.use(router)
app.use(pinia)
app.use(autoAnimatePlugin)

app.mount('#app')


initializeThemeSetup();
