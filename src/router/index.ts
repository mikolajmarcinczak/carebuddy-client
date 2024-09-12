import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from "@/stores/auth.module";
import {assertIsError} from "@/utility/error.guard";
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfilView.vue'),
    },
    {
      path: '/proteges',
      name: 'proteges',
      component: () => import('../views/ProtegesView.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: async () => {
        try {
          const response = await useAuthStore().logout();
          console.log(response);
        } catch (error: any) {
          assertIsError(error);
          console.log(error);
        }
        return import('../views/HomeView.vue')
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/notes',
      name: 'notes',
      component: () => import('../views/NotesView.vue'),
    },
    {
      path: '/caregivers',
      name: 'caregivers',
      component: () => import('../views/CaregiversView.vue'),
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/CalendarView.vue'),
    }
  ]
})

export default router
