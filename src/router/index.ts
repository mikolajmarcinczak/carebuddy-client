import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useAuthStore} from "@/stores/auth.module";
import {assertIsError} from "@/utility/error.guard";

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
      path: '/ustawienia',
      name: 'ustawienia',
      component: () => import('../views/SettingsView.vue')
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../views/ProfilView.vue')
    },
    {
      path: '/podopieczni',
      name: 'podopieczni',
      component: () => import('../views/ProtegesView.vue')
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      component: () => import('../views/TutorialsView.vue')
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
      path: '/rejestracja-konta',
      name: 'rejestracja konta',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/notatki-użytkownika',
      name: 'notatki użytkownika',
      component: () => import('../views/NotesView.vue')
    },
    {
      path: '/strona-glowna',
      name: 'strona glowna',
      component: () => import('../views/HomeView.vue')
    }
  ]
})

export default router
