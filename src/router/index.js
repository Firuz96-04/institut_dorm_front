import { createRouter, createWebHistory } from 'vue-router';
// createWebHashHistory
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/main',
                    name: 'main',
                    component: () => import('@/views/Main.vue')
                },
                {
                    path: '/free',
                    name: 'free',
                    component: () => import('@/views/Free.vue')
                },
                {
                    path: '/payment',
                    name: 'payment',
                    component: () => import('@/views/Payment.vue')
                },
                {
                    path: '/booking',
                    name: 'booking',
                    component: () => import('@/views/Tenat.vue')
                },
                {
                    path: '/student',
                    name: 'student',
                    component: () => import('@/views/Student.vue')
                },
                {
                    path: '/building',
                    name: 'building',
                    component: () => import('@/views/Building.vue')
                },
                {
                    path: '/room',
                    name: 'room',
                    component: () => import('@/views/Room.vue')
                },
                {
                    path: '/faculty',
                    name: 'faculty',
                    component: () => import('@/views/Faculty.vue')
                },
                {
                    path: '/country',
                    name: 'country',
                    component: () => import('@/views/Country.vue')
                },
                {
                    path: '/privilege',
                    name: 'privilege',
                    component: () => import('@/views/Privilege.vue')
                },
                {
                    path: '/employee',
                    name: 'employee',
                    component: () => import('@/views/Employee.vue')
                },
                {
                    path: '/xabar',
                    name: 'xabar',
                    component: () => import('@/views/Message.vue')
                },
                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue')
                },
                {
                    path: '/uikit/panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/Panels.vue')
                },
                {
                    path: '/uikit/message',
                    name: 'message',
                    component: () => import('@/views/uikit/Messages.vue')
                },

                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                }
            ]
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
