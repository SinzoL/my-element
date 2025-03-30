import { createRouter, createWebHashHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes : Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../views/index.vue'),
        children: [
            {
                path: '/button',
                component: () => import('../views/button/button.vue')
            }
        ]
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router