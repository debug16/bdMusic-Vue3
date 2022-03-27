import {createWebHashHistory, createRouter} from 'vue-router'

export default createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: '/',
        components: {
            default: () => import('/src/components/Home/Home.vue')
        }
    }, {
        path: '/login',
        components: {
            login: () => import('/src/components/Login/Login.vue')
        }
    }]
})
