import { createRouter, createWebHistory } from 'vue-router';
//import Restaurant from '@/views/Restaurant.vue';
import WelcomeScreen from '@/components/WelcomeScreen.vue';
import AdminLogin from '@/components/AdminLogin.vue';
import AdminDashboard from '@/views/AdminDashboard.vue';
import CustomerSignUp from '@/components/CustomerSignUp.vue';
import CustomerLogin from '@/components/CustomerLogin.vue';
import Restaurant from '@/views/Restaurant.vue';
import HomePageView from '@/views/HomePageView.vue';

const routes = [
  { path: '/',
    name: "WelcomeScreen",
    component: WelcomeScreen },

  { path: '/adminLogin',
    name: "AdminLogin",
    component: AdminLogin
  },

  { path: '/adminDashboard',
    name: "AdminDashboard",
    component: AdminDashboard
  },

  {
    path: '/customerSignUp',
    name: "CustomerSignUp",
    component: CustomerSignUp
  },

  {
    path: '/customerLogin',
    name: "CustomerLogin",
    component: CustomerLogin
  },

  {
    path: '/customerDashboard',
    name: "HomePageView",
    component: HomePageView
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
