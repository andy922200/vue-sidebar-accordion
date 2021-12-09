import {
    createApp 
} from 'vue'
import {
    createRouter, createWebHashHistory 
} from 'vue-router'
import Dev from './serve.vue'
import devView from './DevView.vue'

const routes = [
    {
        path: '/',
        component: devView 
    },
    {
        path: '/about',
        component: devView 
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

const app = createApp(Dev)
app.use(router)
app.mount('#app')
