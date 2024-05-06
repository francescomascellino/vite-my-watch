import { createApp } from 'vue'
import './assets/scss/style.scss'
import App from './App.vue'

// IMPORTS router.js
import { router } from './router/router'

// IMPORT PINIA
import { createPinia } from 'pinia'

createApp(App).use(router).use(createPinia()).mount('#app')