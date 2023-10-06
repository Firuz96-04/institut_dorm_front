import { createRouter, createWebHistory } from 'vue-router';
// createWebHashHistory
import AppLayout from '@/layout/AppLayout.vue';
// import Login from '@/views/pages/auth/Login.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            meta: {
                requiresAuth: true,
            },
            children: [
                {
                    path: '/',
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
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {

    const loggedIn = localStorage.getItem('user');
    if (to.name === 'login') {
        next();
      } else if (!loggedIn) {
        // Redirect to the login route if not logged in
        next({ name: 'login' });
      } else {
        // Allow access to other routes if logged in
        next();
      } 
    // if (!loggedIn) {
    //     next({name: 'login'});
    //   } else {
    //     next();
    //   }
});

export default router;
