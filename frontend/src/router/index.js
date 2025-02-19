import { createRouter, createWebHistory } from 'vue-router';
import WelcomeLoginPage from '../components/welcomeLoginPage.vue';
import AdminDashboard from '../components/adminDashboard.vue';
import ManagerDashboard from '../components/managerDashboard.vue';
import ResidentsDashboard from '../components/residentsDashboard.vue';
 
const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: WelcomeLoginPage
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminDashboard
    },
    {
        path: '/manager',
        name: 'Manager',
        component: ManagerDashboard
    },
    {
        path: '/residents',
        name: 'Residents',
        component: ResidentsDashboard
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            next('/');
            return;
        }

        if (to.meta.role && to.meta.role !== userData.roleId) {
            next('/');
            return;
        }
    }
    next();
})

export default router