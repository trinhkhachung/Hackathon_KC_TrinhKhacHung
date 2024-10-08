import Dashbroad from '@/views/Dashbroad.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Product_Mnager from '@/views/Product_Mnager.vue';
import User_Manager from '@/views/User_Manager.vue';
const routes = [
    {
        path: '/admin',
        name: 'admin',
        component: Dashbroad,

    },
    {
        path: '/admin/manager-user',
        name: 'manager-user',
        component: User_Manager,
    },
    {
        path: '/admin/manager-product',
        name: 'manager-product',
        component: Product_Mnager
    }   
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;