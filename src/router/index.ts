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
            },
            {
                path: '/collapse',
                component: () => import('../views/collapse/CollapseView.vue')
            },
            {
                path: '/input',
                component: () => import('../views/input/InputView.vue')
            },
            {
                path: '/form',
                component: () => import('../views/form/FormView.vue')
            },
            {
                path: '/datepicker',
                component: () => import('../views/datepicker/DatepickerView.vue')
            },
            {
                path: 'alert',
                component: () => import('../views/alert/AlertView.vue')
            }, 
            {
                path: 'rate',
                component: () => import('../views/rate/RateView.vue')
            }
        ]
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router