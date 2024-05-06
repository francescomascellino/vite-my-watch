import { createRouter, createWebHashHistory } from 'vue-router';

// IMPORT YOUR VIEWS - EX:

import HomeView from '../views/HomeView.vue';
/*
import NotFound from './views/NotFound.vue';
*/

const routes = [
    //DEFINE YOUR VIEWS - EX:

    {
        path: '/',
        name: 'home',
        component: HomeView,
        // props: { name: "home" },
    },

    {
        path: '/:name',
        name: 'step',
        component: HomeView,
    },

    /*
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
    */
];

// router E' UNA ISTANZA di createRouter() CHE USA LE ROTTE DICHIARATE NELLA const routes
const router = createRouter(
    {
        // HYSTORY E' UN'ISTANZA DI createWebHashHistory()
        history: createWebHashHistory(),
        routes
    }
);

// EXPORT DI router.js
export { router };

// REMEMDER: ADD import { router } from './router.js' AND use(router) on createApp() (EX: createApp(App).use(router).mount('#app') in main.js)