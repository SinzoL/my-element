import { createRouter, createWebHashHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes : Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../views/index.vue'),
        children: [
            {
                path: '/button',
                component: () => import('../views/button/ButtonView.vue')
            },
            {
                path: '/container',
                component: () => import('../views/container/ContainerView.vue')
            },
            {
                path: '/link',
                component: () => import('../views/link/LinkView.vue')
            }
        ]
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router