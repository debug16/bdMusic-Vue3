import {createWebHashHistory, createRouter} from 'vue-router'

export default createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: '/',
        component: () => import('/src/components/Home/Home.vue')
    }, {
        path: '/play',
        component: () => import('/src/components/Play/Play.vue')
    }
    ]
})
